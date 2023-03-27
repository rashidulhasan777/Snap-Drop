import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { LoginComponent } from './components/login/login.component';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { GalleryUploadComponent } from './components/gallery-upload/gallery-upload.component';
import { PendingDashboardComponent } from './components/lab-components/pending-dashboard/pending-dashboard.component';
import { OrdersComponent } from './components/lab-components/orders/orders.component';
import { PrintingComponent } from './components/lab-components/printing/printing.component';
import { ArchiveComponent } from './components/lab-components/archive/archive.component';
import { DialogApprovalComponent } from './components/lab-components/dialog-approval/dialog-approval.component';
import { CartComponent } from './components/cart/cart.component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { OrderDoneComponent } from './components/order-done/order-done.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrderDetailsComponent } from './components/lab-components/order-details/order-details.component';
import { AuthGuardGuard } from './auth-guard.guard';
import { RoleguardUserGuard } from './roleguard-user.guard';
import { RoleguardLabGuard } from './roleguard-lab.guard';
import { RetakeComponent } from './components/retake/retake.component';
import { RetakeDashboardComponent } from './components/lab-components/retake-dashboard/retake-dashboard.component';
import { PassportPhotoInstructionsComponent } from './components/passport-photo-instructions/passport-photo-instructions.component';
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { TakePictureComponent } from './components/take-picture/take-picture.component';
import { AddMorePassportPhotoComponent } from './components/add-more-passport-photo/add-more-passport-photo.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'camera', component: TakePictureComponent },
  { path: 'oauth_google', component: GoogleLoginComponent },
  { path: 'oauth_fb', component: FacebookLoginComponent },
  {
    path: 'user_dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'gallery_upload',
    component: GalleryUploadComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'passport_upload',
    component: AddMorePassportPhotoComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'pendingApproval',
    component: PendingDashboardComponent,
    canActivate: [AuthGuardGuard, RoleguardLabGuard],
  },
  {
    path: 'retakeNeeded',
    component: RetakeDashboardComponent,
    canActivate: [AuthGuardGuard, RoleguardLabGuard],
  },
  {
    path: 'dialogApproval',
    component: DialogApprovalComponent,
    canActivate: [AuthGuardGuard, RoleguardLabGuard],
  },
  {
    path: 'orders',
    component: OrdersComponent,
    canActivate: [AuthGuardGuard, RoleguardLabGuard],
  },
  {
    path: 'printing',
    component: PrintingComponent,
    canActivate: [AuthGuardGuard, RoleguardLabGuard],
  },
  {
    path: 'archive',
    component: ArchiveComponent,
    canActivate: [AuthGuardGuard, RoleguardLabGuard],
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'order_summary',
    component: OrderSummaryComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'order-status',
    component: OrderStatusComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'order_done',
    component: OrderDoneComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'user_address',
    component: UserAddressComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'retake',
    component: RetakeComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'order/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuardGuard, RoleguardLabGuard],
  },
  {
    path: 'passport_photo_instructions',
    component: PassportPhotoInstructionsComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardGuard, RoleguardUserGuard],
  },
  { path: '', pathMatch: 'full', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
