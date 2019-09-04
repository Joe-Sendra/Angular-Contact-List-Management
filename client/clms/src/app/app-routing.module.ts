import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main-app/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminComponent } from './admin/components/main/main.component';
import { UsersComponent } from './user/components/main/main.component';
import { AdminHomeComponent } from './admin/components/home/home.component';
import { UserHomeComponent } from './user/components/home/home.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { AdminUsersComponent } from './admin/components/users/users.component';
import { UserCreateComponent } from './admin/components/user-create/user-create.component';
import { ContactListComponent } from './user/components/contact-list/contact-list.component';
import { ContactCreateComponent } from './user/components/contact-create/contact-create.component';
import { AuthGuard } from './shared/services/auth/guards/auth.guard';
import { Role } from './shared/models/roles';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: AdminHomeComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
      {path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
      {path: 'create', component: UserCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}},
      {path: 'edit/:userId', component: UserCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.admin]}}
    ]
  },
  {path: 'user', component: UsersComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: UserHomeComponent, canActivate: [AuthGuard], data: { roles: [Role.user]}},
      {path: 'contacts', component: ContactListComponent, canActivate: [AuthGuard], data: { roles: [Role.user]}},
      {path: 'edit/:contactId', component: ContactCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.user]}},
      {path: 'create', component: ContactCreateComponent, canActivate: [AuthGuard], data: { roles: [Role.user]}}
    ]
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
