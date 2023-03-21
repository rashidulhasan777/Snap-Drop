import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { LoginComponent } from './components/login/login.component';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { GalleryUploadComponent } from './components/gallery-upload/gallery-upload.component';
import { DeliveryPageComponent } from './components/delivery-page/delivery-page.component';
import { PendingDashboardComponent } from './components/lab-components/pending-dashboard/pending-dashboard.component';
import { OrdersComponent } from './components/lab-components/orders/orders.component';
import { PrintingComponent } from './components/lab-components/printing/printing.component';
import { ArchiveComponent } from './components/lab-components/archive/archive.component';
import { DialogApprovalComponent } from './components/lab-components/dialog-approval/dialog-approval.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'oauth_google', component: GoogleLoginComponent },
  { path: 'oauth_fb', component: FacebookLoginComponent },
  { path: 'user_dashboard', component: UserDashboardComponent },
  { path: 'gallery_upload', component: GalleryUploadComponent },
  { path: 'delivery_page', component: DeliveryPageComponent },
  { path: 'pendingApproval', component: PendingDashboardComponent },
  { path: 'dialogApproval', component: DialogApprovalComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'printing', component: PrintingComponent },
  { path: 'archive', component: ArchiveComponent },
  { path: '', pathMatch: 'full', component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
