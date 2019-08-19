import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main-app/components/main/main.component';
import { HomeComponent } from './main-app/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { UserDataService } from './shared/services/user-data/user-data.service';
import { AdminComponent } from './admin/components/main/main.component';
import { UsersComponent } from './user/components/main/main.component';
import { AdminHomeComponent } from './admin/components/home/home.component';
import { UserHomeComponent } from './user/components/home/home.component';
import { AdminLogoutComponent } from './admin/components/logout/logout.component';
import { UserLogoutComponent } from './user/components/logout/logout.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { ValidateService } from './shared/services/validate/validate.service';
import { AuthService } from './shared/services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';




@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminLogoutComponent,
    UsersComponent,
    UserHomeComponent,
    UserLogoutComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserDataService, ValidateService, AuthService],
  bootstrap: [MainComponent]
})
export class AppModule { }
