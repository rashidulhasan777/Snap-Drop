import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OauthService } from 'src/app/services/oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword = true;

  constructor(
    private oauthService: OauthService,
    private formBuilder: FormBuilder
  ) {}

  loginInfo = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  googleOauth() {
    this.oauthService.googleOauthInit();
  }
  facebookOauth() {
    this.oauthService.fbOauthInit();
  }

  handleLogin() {
    
  }
}
