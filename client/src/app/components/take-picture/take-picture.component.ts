import { Component, HostListener, Renderer2 } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-take-picture',
  templateUrl: './take-picture.component.html',
  styleUrls: ['./take-picture.component.css'],
})
export class TakePictureComponent {
  cameraOpen = true;
  windowWidth: number = 0;
  Image: WebcamImage | null = null;
  trigger: Subject<void> = new Subject<void>();
  dataUrl = '';
  errorMsg = '';

  cameraConfig: MediaTrackConstraints = {
    facingMode: 'user',
    width: { ideal: 2048 },
    height: { ideal: 2048 },
  };

  image: any[] = [];
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.windowWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
  }

  saveImage(webcamImage: WebcamImage) {
    this.Image = webcamImage;
    this.dataUrl = this.Image.imageAsDataUrl;
    // const link = this.renderer.createElement('a');
    // link.setAttribute('href', this.Image.imageAsDataUrl);
    // link.setAttribute('download', `myface.jpg`);
    // link.click();
    // link.remove();
    this.cameraOpen = false;

    // const buff = Buffer.from(this.Image.imageAsBase64, 'base64');
  }

  capture() {
    this.trigger.next();
  }

  getTrigger() {
    return this.trigger.asObservable();
  }
  handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === 'NotAllowedError'
    ) {
      console.warn('Camera access was not allowed by user!');
      this.cameraOpen = false;
      this.errorMsg = `You have denied camera access. We need camera access to take your picture.
      Please re-allow camera permission and refresh the page to take the picture.`;
    }
  }
}
