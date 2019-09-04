import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/user/services/users.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  users: IUser[];
  constructor(private userService: UsersService) { }

  ngOnInit() {
    this.userSubscription = this.userService.users.subscribe(
      updatedUsers => { this.users = updatedUsers; });

    this.userService.getUsers().pipe(take(1)).subscribe(usersData => {
      this.users = usersData;
    });
  }

  editUser(user: IUser) {
    console.log('You are trying to edit: ', user);
  }

  onDeleteUser(user: IUser) {
    this.userService.deleteUser(user._id);
    // console.log('sending this to authService:', user);
    // this.authService.deleteUser(user)
    //   .subscribe(
    //    () => {},
    //    (err) => {console.log(err); },
    //    () => {});
    // this.loadUsers();
  }

  // loadUsers() {
  //   this.authService.getUsers()
  //   .subscribe(
  //     res => {
  //       this.users = res;
  //     },
  //     err => {}
  //   );
  // }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
