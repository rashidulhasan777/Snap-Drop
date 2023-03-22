import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly labURL = 'http://127.0.0.1:3000/order';

  constructor(private http: HttpClient) {}

  getOrdersbyStatus(status: String): Observable<Order[]> {
    return this.http.get<Order[]>(this.labURL + '/' + status);
  }
}