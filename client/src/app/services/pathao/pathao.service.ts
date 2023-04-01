import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseBackendURL } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class PathaoService {
  baseUrl = baseBackendURL;

  constructor(private http: HttpClient) {}

  getPathaoAccessToken(): Observable<{ pathaoToken: string }> {
    return this.http.get<{ pathaoToken: string }>(
      `${this.baseUrl}/pathao/accessToken`
    );
  }

  getPathaoZone(
    city_id: number
  ): Observable<{ zone_id: number; zone_name: string }[]> {
    return this.http.post<{ zone_id: number; zone_name: string }[]>(
      `${this.baseUrl}/pathao/zones`,
      {
        pathaoToken: this.pathaoToken,
        city_id,
      }
    );
  }

  getPathaoArea(
    zone_id: number
  ): Observable<{ area_id: number; area_name: string }[]> {
    return this.http.post<{ area_id: number; area_name: string }[]>(
      `${this.baseUrl}/pathao/areas`,
      {
        pathaoToken: this.pathaoToken,
        zone_id,
      }
    );
  }

  createOrder(id: string) {
    // console.log(id);
    return this.http.post(
      `${this.baseUrl}/pathao/order`,
      {
        id,
        pathaoToken: this.pathaoToken,
      },
      {
        headers: {
          Authorization: `Bearer ${this.jwtToken}`,
        },
      }
    );
  }

  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
  get pathaoToken() {
    return JSON.parse(localStorage.getItem('pathaoAccessToken') || "''")
      .access_token;
  }
}
