import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/shared/services/user-data/user-data.service';

@Component({
  selector: 'app-user-logout',
  template: '',
  styles: ['']
})
export class UserLogoutComponent implements OnInit {

  constructor(private userData: UserDataService, private router: Router) { }

  ngOnInit() {
    this.userData.logoutUser();
    this.router.navigateByUrl('/user/login');
  }

}
