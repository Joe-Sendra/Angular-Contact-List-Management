import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

import { map } from 'rxjs/operators';
import { IUser } from '../../models/user';

const BACKEND_URL = environment.apiUrl + '/users/';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  currentUser: IUser;
  userSubject = new BehaviorSubject(this.currentUser);
  constructor(private httpClient: HttpClient) {

  }

  // registerUser(user): Observable<any> {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   console.log(BACKEND_URL);
  //   return this.httpClient.post(`${BACKEND_URL}register`, user, {headers})
  //     // .subscribe(
  //     //   res => {
  //     //     // this.loadAll();
  //     //     console.log('TODO update user Subject (user added)', res);
  //     //   },
  //     //   err => console.error(err)
  //     // )
  //     ;
  // }

  // registerUser(user) {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(`${config.apiUrl}/users/register`, user, { headers }).pipe(map((res: any) => res));
  // }

  // addUser(user) {
  //   const headers = new HttpHeaders();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post(`${config.apiUrl}/users/create`, user, { headers }).pipe(map((res: any) => res));
  // }

  authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(`${BACKEND_URL}login`, user, { headers }).pipe(map((res: any) => {
      this.currentUser = {
        _id: null,
        email: user.email,
        password: user.password,
        role: res.role
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
    this.currentUser = null;
    this.userSubject.next(this.currentUser);
    localStorage.clear();
  }
}
