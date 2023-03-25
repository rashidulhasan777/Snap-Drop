import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PathaoService {
  baseUrl = 'http://localhost:3000';

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
    return this.http.post(`${this.baseUrl}/pathao/order`, {
      id,
      pathaoToken: this.pathaoToken,
    });
  }

  get pathaoToken() {
    return JSON.parse(localStorage.getItem('pathaoAccessToken') || "''")
      .access_token;
  }
}
