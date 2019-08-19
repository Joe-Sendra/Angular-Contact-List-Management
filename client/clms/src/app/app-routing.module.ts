import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main-app/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminComponent } from './admin/components/main/main.component';
import { UsersComponent } from './user/components/main/main.component';
import { AuthGuardService as AuthGuard } from './shared/services/guards/auth-guard.service';
import { RoleGuardService as RoleGuard } from './shared/services/guards/role-guard.service';
import { AdminHomeComponent } from './admin/components/home/home.component';
import { UserHomeComponent } from './user/components/home/home.component';
import { RegisterComponent } from './shared/components/register/register.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
    children: [
      {path: 'home', component: AdminHomeComponent, canActivate: [RoleGuard], data: {
        expectedRole: 'admin'}
      },
      {path: 'logout', component: LoginComponent}
    ]
  },
  {path: 'user', component: UsersComponent, canActivate: [AuthGuard],
    children: [
      {path: 'home', component: UserHomeComponent, canActivate: [RoleGuard], data: {
        expectedRole: 'user'}
      },
      {path: 'logout', component: LoginComponent}
    ]
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
