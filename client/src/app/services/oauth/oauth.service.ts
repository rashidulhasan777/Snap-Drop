import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseBackendURL, baseFrontendURL } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  private backendRoot = baseBackendURL;

  constructor(private http: HttpClient) {}

  googleOauthInit() {
    const client_id =
      '861084726957-9qcs9ivbphq1043ls2b2me5obfhk48ut.apps.googleusercontent.com';
    const redirect_uri = `${baseFrontendURL}/oauth_google`;
    const scopes = 'profile email';
    const response_type = 'code';
    const url = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    url.searchParams.append('client_id', client_id);
    url.searchParams.append('redirect_uri', redirect_uri);
    url.searchParams.append('scope', scopes);
    url.searchParams.append('response_type', response_type);
    window.location.href = url.toString();
  }

  googleOauthGetAccessCode(code: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      this.backendRoot + '/googleAccessCode',
      { code }
    );
  }

  fbOauthInit() {
    const client_id = '896761518480969';
    const redirect_uri = `${baseFrontendURL}/oauth_fb`;
    const scopes = 'public_profile email user_photos';
    const response_type = 'code';
    const url = new URL('https://www.facebook.com/v11.0/dialog/oauth');
    url.searchParams.append('client_id', client_id);
    url.searchParams.append('redirect_uri', redirect_uri);
    url.searchParams.append('scope', scopes);
    url.searchParams.append('response_type', response_type);
    window.location.href = url.toString();
  }

  fbOauthGetAccessCode(code: string): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      this.backendRoot + '/fbAccessCode',
      { code }
    );
  }

  oauthLogin(user: {
    name: string;
    email: string;
    profilePic: string;
  }): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(
      this.backendRoot + '/oauthLogin',
      user
    );
  }
}
