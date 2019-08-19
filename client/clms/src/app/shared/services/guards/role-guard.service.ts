import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserDataService } from '../user-data/user-data.service';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  user: IUser;

  constructor(public auth: AuthService, public router: Router, private userData: UserDataService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    this.user = this.userData.getCurrentUser();

    // if (!this.auth.isAuthenticated() ||
    // this.user.usertype !== expectedRole) {
    //   this.router.navigate(['login']);
    //   return false;
    // }
    return true;
  }
}
