import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectedRole = route.data.expectedRole;
    if (!this.auth.loggedIn() || this.auth.getRole() !== expectedRole) {
      // User is not logged in, or does not have the expected role needed for this route
      // Redirect user to login
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
