import { Injectable } from '@angular/core';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private sampleUsers: User[] = [
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
  constructor() { }

  loginUser(userLookup: User): boolean {
    console.log(userLookup.username);
    for (const user of this.sampleUsers) {
        if (user.username === userLookup.username) {
          if (user.password === userLookup.password) {
            // User and password match
            return true;
          }
        }
    }
    // User and or password not found or do not match
    return false;
  }
}
