import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from '../../models/roles';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  private authListenerSubs: Subscription;
  currentEmail: string;
  currentRole: Role;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(authData => {
      console.log(authData);
      this.currentEmail = authData.email;
      this.currentRole = authData.role;
    });
  }

  onLogoutCLick() {
    this.authService.logout();
    this.router.navigate(['login']);
    return false; // TODO where is this being returned?
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
