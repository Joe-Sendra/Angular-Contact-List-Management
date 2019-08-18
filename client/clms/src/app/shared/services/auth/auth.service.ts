import { Injectable } from '@angular/core';
import { UserDataService } from '../user-data/user-data.service';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: IUser;

  constructor(private userData: UserDataService) { }

  public isAuthenticated(): boolean {
    this.user = this.userData.getCurrentUser();
    if (this.user.login.status) {
      return true;
    }
    return false;
  }
}
