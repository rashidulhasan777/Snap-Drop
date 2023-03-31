import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-splashscreen',
  templateUrl: './splashscreen.component.html',
  styleUrls: ['./splashscreen.component.css'],
})
export class SplashscreenComponent {
  splashOptions: AnimationOptions = {
    path: '../../../assets/splashscreen_animation/83161-studio-photography.json',
  };
  constructor(private router: Router) {}
  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 3000);
  }
}
