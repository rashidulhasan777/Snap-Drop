import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order.interface';
import { ImageInterface } from 'src/app/interfaces/image.interface';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = 'http://localhost:3000/order';

  constructor(private http: HttpClient) {}

  getOrdersbyStatus(status: string): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + '/' + status, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }
  getOrdersbyId(id: string): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + 'byId/' + id, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  changeOrderStatus(id: string, body: { orderStatus: string }) {
    return this.http.put(this.baseUrl + '/' + id, body, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }
  updateOrder(id: string, body: ImageInterface[]): Observable<Order> {
    return this.http.put<Order>(this.baseUrl + '/' + id, body, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.baseUrl, order, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }
  setOrderPaid(): Observable<Order> {
    return this.http.put<Order>(this.baseUrl + '/paid', '', {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  cleanUnpaidOrders(): Observable<void> {
    return this.http.delete<void>(this.baseUrl + '/unpaid', {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  getCustomerOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'byCustomer', {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }
  getCustomerLatestOrder(): Observable<Order> {
    return this.http.get<Order>(this.baseUrl + '/latestOrder', {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
}
