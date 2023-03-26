import { Component } from '@angular/core';
import { OauthService } from './services/oauth/oauth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from './services/authentication/authentication.service';
import { PathaoService } from './services/pathao/pathao.service';

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
    private pathao: PathaoService
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
    this.authService.userRole().subscribe((res) => (this.role = res.role));
    this.pathao.getPathaoAccessToken().subscribe({
      next: (res) => {
        console.log('first');
        localStorage.setItem(
          'pathaoAccessToken',
          JSON.stringify(res.pathaoToken)
        );
      },
    });
  }
}
