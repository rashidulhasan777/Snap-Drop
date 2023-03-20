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

    // const buff = Buffer.from(this.Image.imageAsBase64, 'base64');
  }

  capture() {
    this.trigger.next();
  }

  getTrigger() {
    return this.trigger.asObservable();
  }

  targetStyle() {
    let x = 100 + Math.random() * 100;
    let y = 100 + Math.random() * 100;
    return {
      top: `${x}px`,
      left: `${y}px`,
    };
  }
}
