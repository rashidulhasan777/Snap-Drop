import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css'],
})
export class FacebookLoginComponent implements OnInit {
  constructor(
    private oauthService: OauthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}
  ngOnInit() {
    if (localStorage.getItem('fbAccessToken')) {
      // navigate to client homepage
      return;
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params);
      // if(params['error])
      if (params['code']) {
        this.oauthService
          .fbOauthGetAccessCode(params['code'])
          .subscribe((res) => {
            console.log(res.access_token);
            localStorage.setItem('fbAccessToken', res.access_token);
          });
      }
    });
  }
}
