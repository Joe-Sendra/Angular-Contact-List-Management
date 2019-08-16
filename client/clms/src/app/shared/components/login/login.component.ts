import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserDataService } from '../../services/user-data/user-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {username: null, password: null, usertype: null, login: {status: null}};
  constructor(private userData: UserDataService, private router: Router) { }

  ngOnInit(): void {

  }

  login(user: any) {
    if (this.userData.loginUser(this.user) === true) {
      this.user = this.userData.getUser(this.user);
      // Route to component based on role
      this.router.navigate(['/' + this.user.usertype]);
    }
  }
}
