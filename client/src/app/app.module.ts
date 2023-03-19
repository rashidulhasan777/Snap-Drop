// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [AppComponent, GoogleLoginComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
  ],
=======
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';

@NgModule({
  declarations: [AppComponent, GoogleLoginComponent, FacebookLoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
>>>>>>> facebook-oauth
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
