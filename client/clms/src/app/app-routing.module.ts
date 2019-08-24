import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main-app/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminComponent } from './admin/components/main/main.component';
import { UsersComponent } from './user/components/main/main.component';
import { AdminHomeComponent } from './admin/components/home/home.component';
import { UserHomeComponent } from './user/components/home/home.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AuthGuardService } from './shared/services/guards/auth-guard.service';
import { RoleGuardService as RoleGuard } from './shared/services/guards/role-guard.service';
import { AdminUsersComponent } from './admin/components/users/users.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: AdminHomeComponent, canActivate: [RoleGuard], data: {expectedRole: 'admin'}},
      {path: 'users', component: AdminUsersComponent, canActivate: [RoleGuard], data: {expectedRole: 'admin'}},
      {path: 'logout', component: LoginComponent}
    ]
  },
  {path: 'user', component: UsersComponent, canActivate: [AuthGuardService],
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
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
