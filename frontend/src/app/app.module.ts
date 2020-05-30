import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { ProfileComponent } from './profile/profile.component';

import { authInterceptorProviders } from 'src/_helpers/auth.interceptor';
import { HeaderComponent } from './template/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,    
    ProfileComponent, HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
