import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/shared/services/user-data/user-data.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class AdminComponent implements OnInit {
  user: IUser;
  constructor(private router: Router, private userData: UserDataService) { }

  ngOnInit() {
    this.user = this.userData.getCurrentUser();
    this.router.navigate(['admin/home']);
  }

}
