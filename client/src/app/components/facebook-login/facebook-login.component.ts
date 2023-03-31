import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { OauthService } from 'src/app/services/oauth/oauth.service';

@Component({
  selector: 'app-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.css'],
})
export class FacebookLoginComponent implements OnInit {
  constructor(
    private authService: AuthenticationService,
    private oauthService: OauthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('Logging you in');
    this.loading.setLoading(true);
  }
  ngOnInit() {
    if (localStorage.getItem('fbAccessToken')) {
      this.router.navigate(['user_dashboard']);
      return;
    }
    this.activatedRoute.queryParams.subscribe((params) => {
      // if(params['error])
      if (params['code']) {
        this.oauthService
          .fbOauthGetAccessCode(params['code'])
          .subscribe((res) => {
            localStorage.setItem('fbAccessToken', res.access_token);
            this.http
              .get('https://graph.facebook.com/v16.0/me?fields=email%2Cname', {
                headers: {
                  Authorization: `Bearer ${res.access_token}`,
                },
              })
              .subscribe((res: any) => {
                const { name, email } = res;
                this.oauthService
                  .oauthLogin({ name, email, profilePic: '' })
                  .subscribe((res) => {
                    localStorage.setItem('userAccessToken', res.access_token);
                    this.authService.userRole().subscribe((res) => {
                      if (res.role === 'customer')
                        this.router
                          .navigate(['user_dashboard'])
                          .then(() => window.location.reload());
                      else if (res.role === 'lab')
                        this.router.navigate(['lab-dashboard']);
                      else this.authService.logout();
                    });
                  });
              });
          });
      }
    });
  }
}
