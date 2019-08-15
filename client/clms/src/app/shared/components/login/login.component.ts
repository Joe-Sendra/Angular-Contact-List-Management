import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserDataService } from '../../services/user-data/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {username: null, password: null, usertype: null, login: {status: null}};
  constructor(private userData: UserDataService) { }

  ngOnInit(): void {

  }

  login(user: any) {
    console.log(this.user);
    console.log(this.userData.loginUser(this.user));
    // throw new Error('Method not fully implemented.');
  }
}
