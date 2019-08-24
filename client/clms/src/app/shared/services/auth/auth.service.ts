import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../../config';
import { IUser } from '../../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  currentUser: IUser;
  userSubject = new BehaviorSubject(this.currentUser);
  constructor(private http: HttpClient) {

  }

  registerUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${config.apiUrl}/users/register`, user, { headers }).pipe(map((res: any) => res));
  }

  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${config.apiUrl}/users/authenticate`, user, { headers }).pipe(map((res: any) => {
      this.currentUser = {
        username: user.username,
        password: user.password,
        role: res.role,
        login: {status: true}
      };
      this.userSubject.next(this.currentUser);
      return res;
    }
      ));
  }

  getRole() {
    if (this.currentUser) {
      return this.currentUser.role;
    } else {
      return 'Unauthorized';
    }
  }

  getProfile() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${config.apiUrl}/users/profile`, { headers }).pipe(map((res) => res));
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
    this.currentUser = null;
    this.userSubject.next(this.currentUser);
    localStorage.clear();
  }
}
