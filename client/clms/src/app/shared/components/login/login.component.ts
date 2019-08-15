import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {username: null, password: null};
  constructor() { }

  ngOnInit(): void {

  }

  login(user: any) {
    console.log(this.user);
    throw new Error('Method not fully implemented.');
  }
}
