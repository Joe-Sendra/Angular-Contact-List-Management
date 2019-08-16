import { Injectable } from '@angular/core';
import { UserDataService } from '../user-data/user-data.service';
import { User } from '../../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private userData: UserDataService) { }

  public isAuthenticated(): boolean {
    this.user = this.userData.getCurrentUser();
    if (this.user.login.status) {
      return true;
    }
    return false;
  }
}
