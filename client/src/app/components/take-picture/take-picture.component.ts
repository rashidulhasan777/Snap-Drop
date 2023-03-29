import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';

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
  delayed = false;

  cameraConfig: MediaTrackConstraints = {
    facingMode: 'user',
    width: { ideal: 2048 },
    height: { ideal: 2048 },
  };

  image: any[] = [];
  constructor(private idbService: IdbServiceService, private router: Router) {}

  ngOnInit() {
    this.windowWidth = window.innerWidth;
    setTimeout(() => (this.delayed = !this.delayed), 800);
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
  retakePhoto() {
    this.cameraOpen = true;
  }
  async addToPassportPhotos() {
    if (this.Image) {
      const image: ImageInterface = {
        photoSize: 'passport',
        orgFilename: `passport.jpg`,
        imageURL: this.Image.imageAsDataUrl,
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
  
}
