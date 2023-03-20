import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OauthService } from 'src/app/services/oauth.service';
import { Subject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hidePassword = true;
  errorMessage = '';
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private authService: AuthenticationService,
    private oauthService: OauthService,
    private formBuilder: FormBuilder,
    private router: Router
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
    if (this.loginInfo.valid) {
      const { email, password } = this.loginInfo.value;
      if (email && password)
        this.authService.login({ email, password }).subscribe({
          next: (response) => {
            localStorage.setItem('userAccessToken', response.access_token);
            this.router.navigate(['user_dashboard']);
          },
          error: (response) => {
            this.errorMessage = response.error.errorMessage;
          },
        });
    } else {
      this.errorMessage = 'Please fill in the form correctly';
    }
  }

  get emailError() {
    if (this.loginInfo.controls.email.touched) {
      if (this.loginInfo.controls.email.hasError('email'))
        return 'Please enter a valid email address';
      if (this.loginInfo.controls.email.hasError('required')) {
        return 'Email is required';
      }
    }
    return '';
  }
  get passwordError() {
    if (this.loginInfo.controls.password.touched) {
      if (this.loginInfo.controls.password.hasError('minlength'))
        return 'Password is at least 8 characters long';
      if (this.loginInfo.controls.password.hasError('required')) {
        return 'Password is required';
      }
    }
    return '';
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
