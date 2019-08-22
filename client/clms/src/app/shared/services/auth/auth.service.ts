import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { config } from '../../../config';
// import { UserDataService } from '../user-data/user-data.service';
// import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) {

   }

   registerUser(user) {
     console.log('TODO: Need to verify user doesnt already exist');
     const headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     return this.http.post(`${config.apiUrl}/users/register`, user, {headers}).pipe(map((res) => res));
   }

   authenticateUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${config.apiUrl}/users/authenticate`, user, {headers}).pipe(map((res: any) => res));
   }

   getProfile() {
    const headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get(`${config.apiUrl}/users/profile`, {headers}).pipe(map((res) => res));
   }

   storeUserData(token, user) {
     localStorage.setItem('id_token', token);
     localStorage.setItem('user', JSON.stringify(user));
     this.authToken = token;
     this.user = user;
   }

    loadToken() {
      const token = localStorage.getItem('id_token');
      this.authToken = token;
    }

   logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
   }
}
