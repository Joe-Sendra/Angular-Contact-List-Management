import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/user';
import { Observer, Observable } from 'rxjs';
import { Role } from '../../models/roles';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  currentEmail: string;
  currentRole: Role;
  userObserver: Observer<IUser>;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userObserver = {
      next: (user) => {
        if (user) {
          this.currentEmail = user.email;
          this.currentRole = user.role;
        } else {
          this.currentEmail = null;
          this.currentRole = null;
        }
      },
      error: (err) => { console.log('Observer error: ', err); },
      complete: () => {}
    };
    this.authService.userSubject.subscribe(this.userObserver);
  }

  onLogoutCLick() {
    this.authService.logout();
    this.router.navigate(['login']);
    return false;
  }
}
