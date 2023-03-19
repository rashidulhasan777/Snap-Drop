// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Components
import { AppComponent } from './app.component';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { FacebookLoginComponent } from './components/facebook-login/facebook-login.component';

@NgModule({
  declarations: [AppComponent, GoogleLoginComponent, FacebookLoginComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
