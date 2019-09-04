import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { UsersComponent } from './user/components/main/main.component';
import { UserCreateComponent } from './admin/components/user-create/user-create.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { SandboxService } from './sandbox/sandbox.service';
import { UsersService } from './user/services/users.service';
import { ContactListComponent } from './user/components/contact-list/contact-list.component';
import { ContactCreateComponent } from './user/components/contact-create/contact-create.component';
import { ContactDetailComponent } from './user/components/contact-detail/contact-detail.component';
import { ContactsService } from './user/services/contacts.service';
import { AuthInterceptor } from './shared/services/auth/auth-interceptor';





@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminUsersComponent,
    UserCreateComponent,
    UsersComponent,
    UserHomeComponent,
    ContactListComponent,
    ContactCreateComponent,
    ContactDetailComponent,
    RegisterComponent,
    NavbarComponent,
    SandboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ValidateService, AuthService, UsersService, ContactsService, SandboxService,
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [MainComponent]
})
export class AppModule { }
