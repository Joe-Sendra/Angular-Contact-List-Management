import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/shared/services/user-data/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-logout',
  template: '',
  styleUrls: ['./logout.component.css']
})
export class AdminLogoutComponent implements OnInit {

  constructor(private userData: UserDataService, private router: Router) { }

  ngOnInit() {
    this.userData.logoutUser();
    this.router.navigateByUrl('/admin/login');
  }

}
