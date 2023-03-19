import { Component } from '@angular/core';
import { OauthService } from './services/oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'SnapDrop';
  constructor(private oauthService: OauthService) {}

  googleOauth() {
    this.oauthService.googleOauthInit();
  }
  fbOauth() {
    this.oauthService.fbOauthInit();
  }
}
