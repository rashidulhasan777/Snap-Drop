import { Component } from '@angular/core';
import { OauthService } from './services/oauth/oauth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from './services/authentication/authentication.service';
import { PathaoService } from './services/pathao/pathao.service';
import { SwPush } from '@angular/service-worker';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader/loader.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SnapDrop';
  role = '';
  constructor(
    private maticonService: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private authService: AuthenticationService,
    private pathao: PathaoService,
    readonly swPush: SwPush,
    private router: Router,
    private loading: LoaderService
  ) {
    this.maticonService.addSvgIcon(
      'google',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/google_icon.svg')
    );
    this.maticonService.addSvgIcon(
      'facebook',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/facebook_icon.svg'
      )
    );
    this.maticonService.addSvgIcon(
      'reset_image',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/reset_image.svg')
    );
    this.authService.userRole().pipe(take(1)).subscribe((res) => (this.role = res.role));
    if (!localStorage.getItem('pathaoAccessToken'))
      this.pathao.getPathaoAccessToken().pipe(take(1)).subscribe({
        next: (res) => {
          localStorage.setItem(
            'pathaoAccessToken',
            JSON.stringify(res.pathaoToken)
          );
        },
      });
  }

  ngOnInit() {
    this.swPush.notificationClicks.pipe(take(1)).subscribe(
      ({ action, notification }: { action: any; notification: any }) => {
        // TODO: Do something in response to notification click.
        this.router.navigate(['login']);
      }
    );
  }

  get Loading() {
    return this.loading.getLoading();
  }

  get showNavbar() {
    return !this.loading.getBlockNavbar();
  }
}
