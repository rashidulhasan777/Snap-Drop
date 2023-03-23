import { Component } from '@angular/core';
import { Order } from 'src/app/interfaces/order.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-order-done',
  templateUrl: './order-done.component.html',
  styleUrls: ['./order-done.component.css'],
})
export class OrderDoneComponent {
  userInstruction: string | null = '';
  CompletedOrder: Order = { labId: '' };
  errorMessage = '';
  nothingInCart = false;
  constructor(
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.userInstruction = localStorage.getItem('instructionFromUser');
    this.cartService.getCart().subscribe({
      next: (res) => {
        const order: Order = {
          labId: 'sss', //Needs to change
          passportPictures: res.passportPictures,
          galleryPictures: res.galleryPictures,
          instruction: this.userInstruction || '',
        };
        this.orderService.createOrder(order).subscribe((res) => {
          this.CompletedOrder = res;
          setTimeout(() => {
            this.cartService.clearCart().subscribe();
          }, 5000);
        });
      },
      error: (res) => {
        this.errorMessage = res.error.errorMessage;
        this.nothingInCart = true;
      },
    });
  }
}
