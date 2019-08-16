import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/shared/services/user-data/user-data.service';
import { User } from 'src/app/shared/classes/user';

@Component({
  selector: 'app-users-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class UsersComponent implements OnInit {
  user: User;
  constructor(private router: Router, private userData: UserDataService) { }

  ngOnInit() {
    this.user = this.userData.getCurrentUser();
    this.router.navigate(['user/home']);
  }

}
