import { Component, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';

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
  constructor(
    private renderer: Renderer2,
    private cloudinary: CloudinaryService,
    private cartService: CartService,
    private router: Router
  ) {}

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
  addToPassportPhotos() {
    if (this.Image)
      this.cloudinary
        .cloudUpload(this.Image?.imageAsDataUrl, 'passport', 10, 10, 'passport')
        .subscribe((resCloudinary: any) => {
          this.cartService.getCart().subscribe((res) => {
            const cartData: Cart = res || {passportPictures: []};
            cartData.passportPictures?.push({
              photoSize: 'passport',
              orgFilename: 'passport',
              imageURL: resCloudinary.secure_url,
              copies: 1,
              approved: false,
              typeOfImage: 'passport',
            });
            this.cartService.updateCart(cartData).subscribe((res) => {
              this.router.navigate(['passport_upload']);
            });
          });
        });
  }
}
