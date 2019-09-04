import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './main-app/components/home/home.component';
import { LoginComponent } from './shared/components/login/login.component';
import { AdminComponent } from './admin/components/main/main.component';
import { UsersComponent } from './user/components/main/main.component';
import { AdminHomeComponent } from './admin/components/home/home.component';
import { UserHomeComponent } from './user/components/home/home.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { RoleGuardService as RoleGuard } from './shared/services/guards/role-guard.service';
import { AdminUsersComponent } from './admin/components/users/users.component';
import { UserCreateComponent } from './admin/components/user-create/user-create.component';
import { SandboxComponent } from './sandbox/sandbox.component';
import { ContactListComponent } from './user/components/contact-list/contact-list.component';
import { ContactCreateComponent } from './user/components/contact-create/contact-create.component';
import { AuthGuard } from './shared/services/auth/guards/auth.guard';



// const routes: Routes = [
//   {path: '', component: HomeComponent},
//   {path: 'register', component: RegisterComponent},
//   {path: 'login', component: LoginComponent},
//   {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService],
//     children: [
//       {path: '', pathMatch: 'full', redirectTo: 'home'},
//       {path: 'home', component: AdminHomeComponent, canActivate: [RoleGuard], data: {expectedRole: 'admin'}},
//       {path: 'users', component: AdminUsersComponent, canActivate: [RoleGuard], data: {expectedRole: 'admin'}},
//       {path: 'create', component: UserCreateComponent, canActivate: [RoleGuard], data: {expectedRole: 'admin'}},
//       {path: 'logout', component: LoginComponent}
//     ]
//   },
//   {path: 'user', component: UsersComponent, canActivate: [AuthGuardService],
//     children: [
//       {path: 'home', component: UserHomeComponent, canActivate: [RoleGuard], data: {
//         expectedRole: 'user'}
//       },
//       {path: 'logout', component: LoginComponent}
//     ]
//   },
//   {path: '**', redirectTo: '/'}
// ];

const routes: Routes = [
  {path: 'sandbox', component: SandboxComponent},
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: AdminHomeComponent, canActivate: [AuthGuard]},
      {path: 'users', component: AdminUsersComponent, canActivate: [AuthGuard]},
      {path: 'create', component: UserCreateComponent, canActivate: [AuthGuard]},
      {path: 'edit/:userId', component: UserCreateComponent, canActivate: [AuthGuard]}
    ]
  },
  {path: 'user', component: UsersComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: UserHomeComponent, canActivate: [AuthGuard]},
      {path: 'contacts', component: ContactListComponent, canActivate: [AuthGuard]},
      {path: 'edit/:contactId', component: ContactCreateComponent, canActivate: [AuthGuard]},
      {path: 'create', component: ContactCreateComponent, canActivate: [AuthGuard]}
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
