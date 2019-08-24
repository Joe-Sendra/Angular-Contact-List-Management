import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main-app/components/main/main.component';
import { HomeComponent } from './main-app/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminComponent } from './admin/components/main/main.component';
import { AdminUsersComponent } from './admin/components/users/users.component';
import { AdminHomeComponent } from './admin/components/home/home.component';
import { UserHomeComponent } from './user/components/home/home.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ValidateService } from './shared/services/validate/validate.service';
import { AuthService } from './shared/services/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './shared/services/guards/auth-guard.service';
import { TokenInterceptorService } from './shared/services/token-interceptor/token-interceptor.service';
import { UsersComponent } from './user/components/main/main.component';





@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminUsersComponent,
    UsersComponent,
    UserHomeComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ValidateService, AuthService, AuthGuardService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [MainComponent]
})
export class AppModule { }
