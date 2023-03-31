import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from 'src/app/interfaces/order.interface';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { baseBackendURL } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly baseUrl = `${baseBackendURL}/order`;

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
  getOrdersbyLabId(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'forLab/', {
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
    return this.http.put<Order>(this.baseUrl + 'Update/' + id, body, {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  createOrder(order: Order): Observable<Order> {
    console.log(order);
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

  generateOrderId(labId: number): Observable<{ orderId: string }> {
    return this.http.post<{ orderId: string }>(
      baseBackendURL + '/generateOrderId',
      { labId },
      {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      }
    );
  }

  cutoutAndDownload(order_id: string): Observable<{ zipUrl: string }> {
    return this.http.get<{ zipUrl: string }>(
      baseBackendURL + '/dowloadOrder/' + order_id,
      {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      }
    );
  }
  getLabName(labId: number): Observable<{ labName: string }> {
    return this.http.post<{ labName: string }>(
      baseBackendURL + '/getLabName',
      { labId },
      {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      }
    );
  }

  getOrderCountByProductCategory(): Observable<any> {
    return this.http.get<any>(baseBackendURL + '/orderCountByProductCategory', {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }

  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
}
