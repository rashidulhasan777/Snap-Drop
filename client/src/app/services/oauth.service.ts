import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  backendRoot = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  googleOauthInit() {
    const client_id =
      '861084726957-9qcs9ivbphq1043ls2b2me5obfhk48ut.apps.googleusercontent.com';
    const redirect_uri = 'http://localhost:4200/oauth_google';
    const scopes =
      'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
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
}
