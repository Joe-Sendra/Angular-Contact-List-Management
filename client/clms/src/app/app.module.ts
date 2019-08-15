import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MainAppComponent } from './main-app/main-app.component';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './main-app/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { LogoutComponent } from './shared/components/logout/logout.component';


@NgModule({
  declarations: [
    MainAppComponent,
    MainComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [MainAppComponent]
})
export class AppModule { }
