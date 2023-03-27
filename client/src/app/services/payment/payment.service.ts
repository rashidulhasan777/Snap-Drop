import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private readonly baseUrl = 'https://snapdropbd.fly.dev/payment/';

  constructor(private http: HttpClient) {}

  initiatePayment(order_id: string, amount: number) {
    return this.http.get(this.baseUrl + order_id + '/' + amount, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }
  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
}
