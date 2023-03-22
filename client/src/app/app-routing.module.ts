import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { LoginComponent } from './components/login/login.component';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { GalleryUploadComponent } from './components/gallery-upload/gallery-upload.component';
import { CartComponent } from './components/cart/cart.component';
import { UserAddressComponent } from './components/user-address/user-address.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'oauth_google', component: GoogleLoginComponent },
  { path: 'oauth_fb', component: FacebookLoginComponent },
  { path: 'user_dashboard', component: UserDashboardComponent },
  { path: 'gallery_upload', component: GalleryUploadComponent },
  { path: 'cart', component: CartComponent },
  { path: 'user_address', component: UserAddressComponent },
  { path: '', pathMatch: 'full', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
