import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { IUser } from '../../models/user';
import { Role } from '../../models/roles';

const BACKEND_URL = environment.apiUrl + '/users/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  // currentUser: IUser;
  // userSubject = new BehaviorSubject(this.currentUser);
  constructor(private httpClient: HttpClient) {

  }

  authenticateUser(user) {this.httpClient.post<
    {token: string, expiresIn: number, role: Role, userId: string}
    >(`${BACKEND_URL}login`, user).subscribe(res => {
        localStorage.setItem('id_token', res.token);
        this.authStatusListener.next({isLoggedIn: true, email: user.email, role: res.role});
        return res;
      });
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
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
    // _id: req.params.id, role: req.userData.role
    console.log('request needs to include', user._id, user.role);
    return this.httpClient.delete(`${BACKEND_URL}${user._id}`);
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return !!localStorage.getItem('id_token');
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  logout() {
    this.authToken = null;
    this.authStatusListener.next({
      isLoggedIn: false,
      email: null,
      role: null
    });
    localStorage.clear();
  }
}
