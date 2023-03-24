import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {}

  login(user: {
    email: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      this.baseUrl + '/login',
      user
    );
  }
  register(user: {
    email: string;
    password: string;
  }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      this.baseUrl + '/register',
      user
    );
  }

  oauthLogin(user: {
    name: string;
    email: string;
    profilePic: string;
  }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      this.baseUrl + '/oauthLogin',
      user
    );
  }

  isLoggedIn(): boolean {
    const access_token = localStorage.getItem('userAccessToken');
    if (!access_token || this.jwtHelper.isTokenExpired(access_token))
      return false;
    return true;
  }

  userRole(): Observable<{ role: string }> {
    return this.http.get<{ role: string }>(this.baseUrl + '/userType', {
      headers: {
        Authorization: `Bearer ${this.jwtToken}`,
      },
    });
  }
  private get jwtToken() {
    return localStorage.getItem('userAccessToken');
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['login']).then(() => window.location.reload());
  }
}
