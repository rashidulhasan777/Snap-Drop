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

  cameraConfig: MediaTrackConstraints = {
    facingMode: 'user',
    width: { ideal: 2048 },
    height: { ideal: 2048 },
  };

  image: any[] = [];
  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    console.log(this.renderer);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.windowWidth = window.innerWidth;
  }

  saveImage(webcamImage: WebcamImage) {
    this.Image = webcamImage;
    this.dataUrl = this.Image.imageAsDataUrl;
    const link = this.renderer.createElement('a');
    link.setAttribute('href', this.Image.imageAsDataUrl);
    link.setAttribute('download', `myface.jpg`);
    link.click();
    link.remove();

    const canvas = this.renderer.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const image = new Image();

    const degrees = 200;
    image.onload = () => {
      canvas.width = degrees % 180 === 0 ? image.width : image.height;
      canvas.height = degrees % 180 === 0 ? image.height : image.width;

      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((degrees * Math.PI) / 180);
      ctx.drawImage(image, image.width / -2, image.height / -2);
      this.dataUrl = canvas.toDataUrl();
      console.log('here');
    };
    image.src = this.dataUrl;
    // const buff = Buffer.from(this.Image.imageAsBase64, 'base64');
  }

  capture() {
    this.trigger.next();
  }

  getTrigger() {
    return this.trigger.asObservable();
  }

  downloadFile() {}
}
