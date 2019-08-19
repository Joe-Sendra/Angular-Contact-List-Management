import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
     console.log('TODO: Need to verify user doesnt already exist')
     const headers = new HttpHeaders();
     headers.append('Content-Type', 'application/json');
     return this.http.post('http://localhost:3000/users/register', user, {headers}).pipe(map((res) => res));
   }
}
