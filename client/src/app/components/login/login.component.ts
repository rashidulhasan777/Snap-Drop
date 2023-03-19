import { Component } from '@angular/core';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword = true;
  constructor(private oauthService: OauthService) {}

  googleOauth() {
    // this.oauthService.googleOauthInit();
  }
  facebookOauth() {}

  handleLogin() {}
}
