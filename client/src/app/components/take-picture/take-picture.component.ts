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

  flipped = true;

  dataUrl = '';
  errorMsg = '';
  delayed = false;
  _faceDetector!: FaceDetector.FaceDetection;
  camera!: Camera_Utils.Camera;
  takePicture = false;
  firstTime = true;
  instructionMsg = '';
  currentImage: any;

  constructor(
    private idbService: IdbServiceService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  async ngOnInit() {}

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
      minDetectionConfidence: 0.7,
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
  }
  async onResult(results: FaceDetector.Results) {
    if (results.detections.length < 1) {
      if (this.firstTime) {
        this.firstTime = false;
        this.canvasElem.nativeElement.width = results.image.width;
        this.canvasElem.nativeElement.height = results.image.height;
      }
      this.instructionMsg = 'Please make sure you are on frame';
      return;
    }
    if (results.detections.length > 1) {
      this.instructionMsg = 'Please make sure only one person is visible';
      return;
    }
    if (this.canvasCtx) {
      const eye1 = results.detections[0].landmarks[0];
      const eye2 = results.detections[0].landmarks[1];
      const eyeangle =
        (Math.atan((eye1.y - eye2.y) / (eye1.x - eye2.x)) * 180) / Math.PI;
      // console.log(results.image);
      // console.log('x', results.detections[0].boundingBox.xCenter * 430);
      // console.log('y', results.detections[0].boundingBox.yCenter * 245);
      if (Math.abs(eyeangle) > 25) {
        this.instructionMsg = "Please don't tilt your head";
        return;
      } else {
        this.instructionMsg = '';
      }
      this.canvasCtx.clearRect(
        0,
        0,
        this.canvasElem.nativeElement.width,
        this.canvasElem.nativeElement.height
      );
      if (this.takePicture) {
        this.takePicture = false;
        this.canvasCtx.save();
        this.canvasCtx.scale(-1, 1);
        this.canvasCtx.drawImage(
          results.image,
          this.canvasElem.nativeElement.width * -1,
          0,
          this.canvasElem.nativeElement.width,
          this.canvasElem.nativeElement.height
        );
        this.dataUrl = this.canvasElem.nativeElement.toDataURL('image/jpeg');
        this.canvasCtx.restore();
        await this.camera.stop();
        this.cameraOpen = false;
        this.canvasCtx.clearRect(
          0,
          0,
          this.canvasElem.nativeElement.width,
          this.canvasElem.nativeElement.height
        );
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

  saveImage() {
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
        copies: 1,
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

  ngOnDestroy() {
    (this.videoElem.nativeElement.srcObject as MediaStream)
      .getVideoTracks()[0]
      .stop();
  }
}
