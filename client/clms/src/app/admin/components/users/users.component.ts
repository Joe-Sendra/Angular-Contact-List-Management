import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/user/services/users.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription;
  users: IUser[];
  constructor(private userService: UsersService, private router: Router) { }

  ngOnInit() {
    this.userSubscription = this.userService.users.subscribe(
      updatedUsers => { this.users = updatedUsers; });

    this.userService.getUsers().pipe(take(1)).subscribe(usersData => {
      this.users = usersData;
    });
  }

  editUser(userEmail: string) {
    this.router.navigate(['/admin/edit/' + userEmail], { queryParams: { returnUrl: this.router.routerState.snapshot.url }});
  }

  onDeleteUser(user: IUser) {
    this.userService.deleteUser(user._id);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
