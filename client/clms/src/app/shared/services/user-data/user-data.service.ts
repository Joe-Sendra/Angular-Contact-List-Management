import { Injectable } from '@angular/core';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private sampleUsers: IUser[] = [
    {username: 'admin',
     password: 'admin',
     usertype: 'admin',
     login: {status: false}
    },
    {username: 'user',
     password: 'user',
     usertype: 'user',
     login: {status: false}}
  ];

  private currentUser: IUser = {
    username: null,
    password: null,
    usertype: null,
    login: {
      status: false
    }
  };

  constructor() { }

  loginUser(userLookup: IUser): boolean {
    for (const user of this.sampleUsers) {
      if (user.username === userLookup.username) {
        if (user.password === userLookup.password) {
          // User and password match
          user.login.status = true;
          this.currentUser = user;
          return true;
        }
      }
    }
    // User and or password not found or do not match
    return false;
  }

  logoutUser(): void {
    this.currentUser = {
      username: null,
      password: null,
      usertype: null,
      login: {
        status: false
      }
    };
  }

  getCurrentUser(): IUser {
    return this.currentUser;
  }

}
