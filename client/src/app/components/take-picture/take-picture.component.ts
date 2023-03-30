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

  dataUrl = '';
  errorMsg = '';
  delayed = false;
  _faceDetector!: FaceDetector.FaceDetection;
  camera!: Camera_Utils.Camera;
  takePicture = false;

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
      width: 10000,
      height: 10000,
    });
    await this.camera.start();
  }
  onResult(results: FaceDetector.Results) {
    if (this.canvasCtx) {
      // console.log(results.image);
      // console.log('x', results.detections[0].boundingBox.xCenter * 430);
      // console.log('y', results.detections[0].boundingBox.yCenter * 245);
      this.canvasCtx.clearRect(
        0,
        0,
        this.canvasElem.nativeElement.width,
        this.canvasElem.nativeElement.height
      );
      if (this.takePicture) {
        this.canvasCtx.save();
        this.canvasCtx.drawImage(
          results.image,
          0,
          0,
          this.canvasElem.nativeElement.width,
          this.canvasElem.nativeElement.height
        );
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
  @HostListener('window:resize', ['$event'])
  saveImage(dataUrl: string) {
    const link = this.renderer.createElement('a');
    link.setAttribute('href', dataUrl);
    link.setAttribute('download', `myface.jpg`);
    link.click();
    link.remove();
  }

  async capture() {
    // this.dataUrl = this.canvasElem.nativeElement.toDataURL('image/jpg');
    // const link = this.renderer.createElement('a');
    // link.setAttribute('href', this.dataUrl);
    // link.setAttribute('download', `myface.jpg`);
    // link.click();
    // link.remove();
  }

  retakePhoto() {
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
