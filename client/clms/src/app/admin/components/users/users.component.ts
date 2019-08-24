import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit {

  users: IUser[];
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getUsers()
    .subscribe(
      res => {
        console.log(res);
        this.users = res;
      },
      err => {}
    );
  }

}
