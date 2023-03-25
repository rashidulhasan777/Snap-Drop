// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

//Components
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { LoginComponent } from './components/login/login.component';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserNavbarComponent } from './components/user-navbar/user-navbar.component';
import { GalleryUploadComponent } from './components/gallery-upload/gallery-upload.component';
import { GalleryCardComponent } from './components/gallery-card/gallery-card.component';
import { LabDashboardComponent } from './components/lab-dashboard/lab-dashboard.component';
import { AddPassportPhotoComponent } from './components/add-passport-photo/add-passport-photo.component';
import { PendingDashboardComponent } from './components/lab-components/pending-dashboard/pending-dashboard.component';
import { OrdersComponent } from './components/lab-components/orders/orders.component';
import { PrintingComponent } from './components/lab-components/printing/printing.component';
import { ArchiveComponent } from './components/lab-components/archive/archive.component';
import { DialogApprovalComponent } from './components/lab-components/dialog-approval/dialog-approval.component';
import { DialogDeclineInstructionComponent } from './components/lab-components/dialog-decline-instruction/dialog-decline-instruction.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderDoneComponent } from './components/order-done/order-done.component';
import { UserAddressComponent } from './components/user-address/user-address.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrderDetailsComponent } from './components/lab-components/order-details/order-details.component';
import { NavAndSidebarComponent } from './components/lab-components/nav-and-sidebar/nav-and-sidebar.component';
import { RetakeComponent } from './components/retake/retake.component';
import { RetakeDashboardComponent } from './components/lab-components/retake-dashboard/retake-dashboard.component';
import { PassportPhotoInstructionsComponent } from './components/passport-photo-instructions/passport-photo-instructions.component';

export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    GoogleLoginComponent,
    LoginComponent,
    FacebookLoginComponent,
    RegisterComponent,
    UserDashboardComponent,
    UserNavbarComponent,
    GalleryUploadComponent,
    GalleryCardComponent,
    LabDashboardComponent,
    AddPassportPhotoComponent,
    PendingDashboardComponent,
    OrdersComponent,
    PrintingComponent,
    ArchiveComponent,
    DialogApprovalComponent,
    DialogDeclineInstructionComponent,
    CartComponent,
    PaymentComponent,
    OrderDoneComponent,
    UserAddressComponent,
    OrderSummaryComponent,
    OrderDetailsComponent,
    NavAndSidebarComponent,
    RetakeComponent,
    RetakeDashboardComponent,
    PassportPhotoInstructionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    LottieModule.forRoot({ player: playerFactory }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
