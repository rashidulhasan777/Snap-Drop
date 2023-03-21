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
      this.baseUrl + '/delivery_access/pathao'
    );
  }

  
}
