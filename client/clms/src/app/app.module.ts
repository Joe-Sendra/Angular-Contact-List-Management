import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './main-app/components/main/main.component';
import { HomeComponent } from './main-app/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { UserDataService } from './shared/services/user-data/user-data.service';
import { AdminComponent } from './admin/components/main/main.component';
import { UsersComponent } from './user/components/main/main.component';
import { AdminHomeComponent } from './admin/components/home/home.component';
import { UserHomeComponent } from './user/components/home/home.component';
import { AdminLogoutComponent } from './admin/components/logout/logout.component';
import { UserLogoutComponent } from './user/components/logout/logout.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';




@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
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
    FormsModule
  ],
  providers: [UserDataService],
  bootstrap: [MainComponent]
})
export class AppModule { }
