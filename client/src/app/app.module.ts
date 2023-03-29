// Modules
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { LottieModule } from 'ngx-lottie';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';
import player from 'lottie-web';
import { WebcamModule } from 'ngx-webcam';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

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
import { OrderStatusComponent } from './components/order-status/order-status.component';
import { PassportPhotoInstructionsComponent } from './components/passport-photo-instructions/passport-photo-instructions.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LabDashboardComponent } from './components/lab-components/lab-dashboard/lab-dashboard.component';
import { ChartComponent } from './components/lab-components/chart/chart.component';

import { TakePictureComponent } from './components/take-picture/take-picture.component';
import { AddMorePassportPhotoComponent } from './components/add-more-passport-photo/add-more-passport-photo.component';
import { WarningDialogueComponent } from './components/warning-dialogue/warning-dialogue.component';
import { baseBackendURL } from 'src/config';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading/loading.interceptor';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';

const config: SocketIoConfig = { url: baseBackendURL, options: {} };
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
    OrderStatusComponent,
    PassportPhotoInstructionsComponent,

    TakePictureComponent,
    AddMorePassportPhotoComponent,

    OnboardingComponent,

    UserProfileComponent,
    LabDashboardComponent,
    ChartComponent,
    WarningDialogueComponent,
    SpinnerComponent,
    LineChartComponent,
    PieChartComponent,
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
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    WebcamModule,
    NgChartsModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    { provide: NgChartsConfiguration, useValue: { generateColors: false } },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
