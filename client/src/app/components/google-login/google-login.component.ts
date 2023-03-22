import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OauthService } from 'src/app/services/oauth/oauth.service';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.css'],
})
export class GoogleLoginComponent implements OnInit {
  constructor(
    private oauthService: OauthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    if (localStorage.getItem('googleAccessToken')) {
      this.router.navigate(['user_dashboard']);
      return;
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      // if(params['error])
      if (params['code']) {
        this.oauthService
          .googleOauthGetAccessCode(params['code'])
          .subscribe((res) => {
            localStorage.setItem('googleAccessToken', res.access_token);
            this.http
              .get('https://www.googleapis.com/userinfo/v2/me', {
                headers: {
                  Authorization: `Bearer ${res.access_token}`,
                },
              })
              .subscribe((res: any) => {
                const { name, email, picture } = res;
                this.oauthService
                  .oauthLogin({
                    name,
                    email,
                    profilePic: picture,
                  })
                  .subscribe((res) => {
                    localStorage.setItem('userAccessToken', res.access_token);
                    this.router.navigate(['user_dashboard']);
                  });
              });
          });
      }
    });
  }
}
