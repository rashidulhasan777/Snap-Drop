import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { OauthService } from 'src/app/services/oauth/oauth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  errorMessage = '';
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private authService: AuthenticationService,
    private oauthService: OauthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.authService.userRole().subscribe((res) => {
        if (res.role === 'customer')
          this.router
            .navigate(['user_dashboard'])
            .then(() => window.location.reload());
        else if (res.role === 'lab') this.router.navigate(['lab-dashboard']);
        else this.authService.logout();
      });
    }
  }

  registerForm = this.formBuilder.group(
    {
      email: [
        '',
        {
          validators: [Validators.email, Validators.required],
          updateOn: 'blur',
        },
      ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: [''],
    },
    { validators: this.passwordValidatorFn(), updateOn: 'blur' }
  );
  googleOauth() {
    this.oauthService.googleOauthInit();
  }
  facebookOauth() {
    this.oauthService.fbOauthInit();
  }

  passwordValidatorFn(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.value.password;
      const rePassword = group.value.rePassword;

      if (password !== rePassword) return { passwordMismatch: true };
      else return null;
    };
  }

  handleRegister() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      if (email && password)
        this.authService
          .register({ email, password })
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: (response) => {
              localStorage.setItem('userAccessToken', response.access_token);
              this.authService.userRole().subscribe((res) => {
                if (res.role === 'customer')
                  this.router
                    .navigate(['user_dashboard'])
                    .then(() => window.location.reload());
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
      if (this.registerForm.hasError('passwordMismatch'))
        this.errorMessage = 'Passwords did not match';
      else this.errorMessage = 'Please fill in the form correctly';
    }
  }

  get emailError() {
    if (this.registerForm.controls.email.touched) {
      if (this.registerForm.controls.email.hasError('email'))
        return 'Please enter a valid email address';
      if (this.registerForm.controls.email.hasError('required')) {
        return 'Email is required';
      }
    }
    return '';
  }
  get passwordError() {
    if (this.registerForm.controls.password.touched) {
      if (this.registerForm.controls.password.hasError('minlength'))
        return 'Password needs to be at least 8 characters long';
      if (this.registerForm.controls.password.hasError('required')) {
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
