import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import * as FaceDetector from '@mediapipe/face_detection';
import * as Camera_Utils from '@mediapipe/camera_utils';
import * as Drawing_Utils from '@mediapipe/drawing_utils';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.css'],
})
export class TakePictureComponent {
  @ViewChild('webcamFeed')
  videoElem!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasImage')
  canvasElem!: ElementRef<HTMLCanvasElement>;
  canvasCtx!: CanvasRenderingContext2D | null;
  cameraOpen = true;

  flipped = false;

  startCountdown = false;
  countdown = 3;
  dataUrl = '';
  errorMsg = '';
  delayed = false;
  _faceDetector!: FaceDetector.FaceDetection;
  camera!: Camera_Utils.Camera;
  takePicture = false;
  firstTime = true;
  instructionMsg = '';
  currentImage: any;
  tiltCount = 0;
  countdownStart = 0;
  logMsg = '';
  logMsg2 = '';
  valid = false;
  autoCapture = true;

  hasMultipleCamera = false;

  constructor(
    private idbService: IdbServiceService,
    private router: Router,
    private renderer: Renderer2,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    this.loading.setLoading(true);
    this.loading.setBlockNavbar(true);
  }

  async ngOnInit() {
    if ('mediaDevices' in navigator) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      let total = 0;
      devices.forEach((el) => {
        if (el.kind === 'videoinput') total++;
      });
      if (total) this.hasMultipleCamera = true;
    }
  }

  async ngAfterViewInit() {
    setTimeout(() => (this.delayed = !this.delayed), 800);
    if (this.canvasElem.nativeElement.getContext('2d'))
      this.canvasCtx = this.canvasElem.nativeElement.getContext('2d');
    this._faceDetector = new FaceDetector.FaceDetection({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection@0.4/${file}`;
      },
    });

    this._faceDetector.setOptions({
      selfieMode: true,
      model: 'short',
      minDetectionConfidence: 0.8,
    });
    this._faceDetector.onResults((results: FaceDetector.Results) => {
      this.onResult(results);
    });
    this.camera = new Camera_Utils.Camera(this.videoElem.nativeElement, {
      onFrame: async () => {
        await this._faceDetector.send({
          image: this.videoElem.nativeElement,
        });
      },
      facingMode: 'user',
      width: 10000,
      height: 10000,
    });
    await this.camera.start();
    this.loading.setLoading(false);
  }
  async onResult(results: FaceDetector.Results) {
    if (this.firstTime) {
      this.firstTime = false;
      this.canvasElem.nativeElement.width = results.image.width;
      this.canvasElem.nativeElement.height = results.image.height;
    }
    if (results.detections.length < 1) {
      this.instructionMsg = 'Please make sure you are on frame';
      this.countdownStart = 0;
      this.valid = false;
      return;
    }
    if (results.detections.length > 1) {
      this.instructionMsg = 'Please make sure only one person is visible';
      this.countdownStart = 0;
      this.valid = false;
      return;
    }
    this.instructionMsg = '';
    if (this.canvasCtx) {
      const eye1 = results.detections[0].landmarks[0];
      const eye2 = results.detections[0].landmarks[1];
      const eyeangle =
        (Math.atan((eye1.y - eye2.y) / (eye1.x - eye2.x)) * 180) / Math.PI;
      // console.log(results.image);
      // console.log('x', results.detections[0].boundingBox.xCenter * 430);
      // console.log('y', results.detections[0].boundingBox.yCenter * 245);
      const { xCenter, yCenter, height, width } =
        results.detections[0].boundingBox;
      this.logMsg =
        'xCenter: ' +
        (xCenter * 100).toFixed(2) +
        ', yCenter: ' +
        (yCenter * 100).toFixed(2) +
        ', height: ' +
        (height * 100).toFixed(2) +
        ', width: ' +
        (width * 100).toFixed(2);
      this.logMsg2 =
        'Top percent: ' +
        ((yCenter - height / 2) * 100).toFixed(2) +
        ', Bottom percent: ' +
        ((yCenter + height / 2) * 100).toFixed(2) +
        ', Left percent: ' +
        ((xCenter - width / 2) * 100).toFixed(2) +
        ', Right Percent: ' +
        ((xCenter + width / 2) * 100).toFixed(2);
      if (
        xCenter - width / 2 > 0.28 &&
        xCenter + width / 2 < 0.7 &&
        yCenter + height / 2 < 0.66 &&
        yCenter - height / 2 > 0.27
      ) {
        if (Math.abs(eyeangle) > 24) {
          if (this.tiltCount < 30) {
            this.tiltCount++;
            return;
          }
          this.countdownStart = 0;
          this.valid = false;
          this.instructionMsg = "Please don't tilt your head too much";
          return;
        } else {
          this.tiltCount = 0;
          this.instructionMsg = '';
        }
        this.valid = true;
        if (this.autoCapture) {
          this.instructionMsg =
            'Please stay still and look at the camera and we will take the picture for you.';
          if (!this.countdownStart) this.countdownStart = Date.now();
          this.countdown =
            3 - Math.floor((Date.now() - this.countdownStart) / 1000);
          if (this.countdownStart + 3000 < Date.now()) {
            this.capture();
            this.countdownStart = 0;
          }
        }
      } else {
        this.countdownStart = 0;
        this.valid = false;
      }
      this.clearCanvas();
      if (this.takePicture) {
        this.takePicture = false;
        this.canvasCtx.save();
        this.canvasCtx.scale(this.flipped ? -1 : 1, 1);
        this.canvasCtx.drawImage(
          results.image,
          this.flipped ? this.canvasElem.nativeElement.width * -1 : 0,
          0,
          this.canvasElem.nativeElement.width,
          this.canvasElem.nativeElement.height
        );
        this.dataUrl = this.canvasElem.nativeElement.toDataURL('image/jpeg');
        this.canvasCtx.restore();
        await this.camera.stop();
        this.cameraOpen = false;
        this.clearCanvas();
        return;
      }
      this.canvasCtx.save();

      if (results.detections.length > 0) {
        Drawing_Utils.drawRectangle(
          this.canvasCtx,
          results.detections[0].boundingBox,
          { color: 'blue', lineWidth: 4, fillColor: '#00000000' }
        );
      }
      this.canvasCtx.restore();
    }
  }

  savePhoto() {
    const link = this.renderer.createElement('a');
    link.setAttribute('href', this.dataUrl);
    link.setAttribute('download', `Image.jpg`);
    link.click();
    link.remove();
  }

  async capture() {
    this.takePicture = true;
  }

  async retakePhoto() {
    this.canvasCtx?.restore();
    await this.camera.start();
    this.cameraOpen = true;
  }
  async addToPassportPhotos() {
    if (this.dataUrl) {
      const image: ImageInterface = {
        photoSize: 'passport',
        orgFilename: `passport.jpg`,
        imageURL: this.dataUrl,
        copies: 4,
        approved: false,
        typeOfImage: 'passport',
      };
      try {
        await this.idbService.addAPassportPhoto(image);
        this.router.navigate(['passport_upload']);
      } catch (err) {
        console.log(err);
      }
    }
  }

  clearCanvas() {
    if (this.canvasCtx) {
      this.canvasCtx.clearRect(
        0,
        0,
        this.canvasElem.nativeElement.width,
        this.canvasElem.nativeElement.height
      );
    }
  }
  switchCamera() {
    this.camera.stop();
    this.camera = new Camera_Utils.Camera(this.videoElem.nativeElement, {
      onFrame: async () => {
        await this._faceDetector.send({
          image: this.videoElem.nativeElement,
        });
      },
      facingMode: 'environment',
      width: 10000,
      height: 10000,
    });
    this.firstTime = true;
    this.camera.start();
  }

  ngOnDestroy() {
    (this.videoElem.nativeElement.srcObject as MediaStream)
      .getVideoTracks()[0]
      .stop();
  }
}
