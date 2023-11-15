import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { OauthService } from 'src/app/services/oauth/oauth.service';
import { Subject, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
    private router: Router,
    private loading: LoaderService
  ) {
    this.loading.setBlockNavbar(true);
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService
        .userRole()
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          if (res.role === 'customer') this.router.navigate(['user_dashboard']);
          else if (res.role === 'lab') this.router.navigate(['lab-dashboard']);
          else this.authService.logout();
        });
    }
  }

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
        this.authService
          .login({ email, password })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              localStorage.setItem('userAccessToken', response.access_token);
              this.authService
                .userRole()
                .pipe(takeUntil(this.destroy$))
                .subscribe((res) => {
                  if (res.role === 'customer')
                    this.router.navigate(['user_dashboard']);
                  else if (res.role === 'lab')
                    this.router.navigate(['lab-dashboard']);
                  else this.authService.logout();
                });
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
