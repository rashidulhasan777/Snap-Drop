import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.css'],
})
export class SplashscreenComponent {
  splashOptions: AnimationOptions = {
    path: '../../../assets/splashscreen_animation/83161-studio-photography.json',
  };
  constructor(
    private router: Router,
    private loading: LoaderService,
    private authService: AuthenticationService
  ) {
    this.loading.setBlockNavbar(true);
  }

  redirect() {
    if (this.authService.isLoggedIn()) {
      this.authService.userRole().pipe(take(1)).subscribe((res) => {
        if (res.role === 'customer') this.router.navigate(['user_dashboard']);
        else if (res.role === 'lab') this.router.navigate(['lab-dashboard']);
        else this.authService.logout();
      });
    } else {
      this.router.navigate(['login']);
    }
  }
}
