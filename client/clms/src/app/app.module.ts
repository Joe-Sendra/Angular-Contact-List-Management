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
import { UsersService } from './user/services/users.service';
import { ContactListComponent } from './user/components/contact-list/contact-list.component';
import { ContactCreateComponent } from './user/components/contact-create/contact-create.component';
import { ContactDetailComponent } from './user/components/contact-detail/contact-detail.component';
import { ContactsService } from './user/services/contacts.service';
import { AuthInterceptor } from './shared/services/auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './shared/components/error/error.component';





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
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [ValidateService, AuthService, UsersService, ContactsService,
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [MainComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
