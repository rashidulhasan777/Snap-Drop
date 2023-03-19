import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

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
      // navigate to client homepage
      return;
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      // console.log(params);
      if (params['code']) {
        this.oauthService
          .googleOauthGetAccessCode(params['code'])
          .subscribe((res) => {
            console.log(res.access_token);
            // localStorage.setItem('googleAccessToken', res.access_token);
          });
      }
    });
  }
}
