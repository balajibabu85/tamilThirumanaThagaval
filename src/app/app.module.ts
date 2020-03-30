import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { SocialBarComponent } from './social-bar/social-bar.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CardComponentComponent } from './card-component/card-component.component';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { RegisterFormComponent } from './register-form/register-form.component';

import {OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG} from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';
import { MaterialModule} from './material/material.module';
import { ProfileComponent } from './profile/profile.component';

const config = {
  issuer: 'https://dev-930356.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: '0oa40u56ufki49dJq4x6',
  pkce: true
};

@NgModule({
  declarations: [
    AppComponent,
    MenuBarComponent,
    BookingFormComponent,
    SocialBarComponent,
    CardComponentComponent,
    HomeComponent,
    HotelComponent,
    RegisterFormComponent,
    LoginComponent,
    ProtectedComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    OktaAuthModule,
    MaterialModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: config }],
  bootstrap: [AppComponent]
})
export class AppModule { }
