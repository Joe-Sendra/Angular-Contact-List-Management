import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IUser } from '../../models/user';
import { Role } from '../../models/roles';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + '/users/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private authToken: any;
  private authStatusListener = new BehaviorSubject<{
    isLoggedIn: boolean,
    email: string,
    role: Role
  }>({
      isLoggedIn: false,
      email: null,
      role: null
    });
  private tokenTimer: any;
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  authenticateUser(user) {this.httpClient.post<
    {token: string, expiresIn: number, role: Role, userId: string}
    >(`${BACKEND_URL}login`, user).subscribe(res => {
      const token = res.token;
      if (token) {
        const expiresInDuration = res.expiresIn;
        this.setAuthTimer(expiresInDuration);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate);
        this.isAuthenticated = true;
        this.authStatusListener.next({isLoggedIn: true, email: user.email, role: res.role});
      }
      this.router.navigate(['/' + res.role]);
    });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getRole() {
    // FIXME
    // if (this.currentUser) {
    //   return this.currentUser.role;
    // } else {
    //   return 'Unauthorized';
    // }
  }

  deleteUser(user: IUser): Observable<any> {
    // TODO need to verify role
    return this.httpClient.delete(`${BACKEND_URL}${user._id}`);
  }

  loggedIn() {
    return !!localStorage.getItem('token'); // FIXME
  }

  getToken() {
    return localStorage.getItem('token'); // FIXME
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    console.log(authInformation);
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log(expiresIn);
    if (expiresIn > 0) {
      this.authToken = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next({isLoggedIn: true, email: null, role: null}); // FIXME need to return values instead of Null
    }
  }

  logout() {
    this.authToken = null;
    this.isAuthenticated = false;
    this.authStatusListener.next({
      isLoggedIn: false,
      email: null,
      role: null
    });
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate)
    };
  }
}
