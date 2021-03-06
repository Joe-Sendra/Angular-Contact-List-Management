import {Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { IUser } from '../../shared/models/user';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/users/';

@Injectable()
export class UsersService {
  private _users = new BehaviorSubject<IUser[]>([]);
  private userDataStore: {users: IUser[] } = { users: [] };

  constructor(private httpClient: HttpClient) {}

  getUsersListener() {
    return this._users.asObservable();
  }

  // Adds a user to the DB
  registerUser(user): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(`${BACKEND_URL}register`, user, {headers});
  }

  // Return all users in the DB
  getUsers(): Observable<any> {
    return this.httpClient.get(`${BACKEND_URL}`);
  }

  getUser(userId: string): Observable<any> {
    return this.httpClient.get(`${BACKEND_URL}` + userId);
  }

  editUser(user): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.patch(`${BACKEND_URL}` + user._id, user, {headers});
  }

  deleteUser(userID: string) {
    this.httpClient.delete(`${BACKEND_URL}` + userID).subscribe(res => {
      this.loadAll();
    });
  }

  loadAll() {
    this.httpClient.get<IUser[]>(`${BACKEND_URL}`).subscribe(allUsers => {
        this.userDataStore.users = allUsers;
        this._users.next(Object.assign({}, this.userDataStore).users);
      });
  }

}
