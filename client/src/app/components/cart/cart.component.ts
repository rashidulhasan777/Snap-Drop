import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  passportOrders: { filename: string; link: string }[] = [];
  galleryOrders: { imageName: string; remoteURL: string }[] = [];

  ngOnInit() {
    console.log('here');
    this.passportOrders = JSON.parse(
      localStorage.getItem('userPassportPictures') || '[]'
    );
    this.galleryOrders = JSON.parse(
      localStorage.getItem('userGalleryPictures') || '[]'
    );
    console.log(this.galleryOrders);
  }

  deletePassportOrder() {
    localStorage.removeItem('userPassportPictures');
    this.passportOrders = [];
  }
  deleteGalleryOrder() {
    localStorage.removeItem('userGalleryPictures');
    this.galleryOrders = [];
  }

  get hasOrder() {
    return this.galleryOrders.length || this.passportOrders.length;
  }

  clearAll() {
    this.deleteGalleryOrder();
    this.deletePassportOrder();
  }

  checkOut(){
    
  }
}
