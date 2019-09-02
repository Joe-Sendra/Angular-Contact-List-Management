import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { IContact } from '../shared/models/contacts';


@Injectable()
export class SandboxService {
  private _users = new BehaviorSubject<{
      _id: string;
      email: string;
      password: string;
      role: string;
    }[]>([]);
  private userDataStore: { users: {
      _id: string;
      email: string;
      password: string;
      role: string;
    }[] } = { users: [] };
  readonly users = this._users.asObservable();

  private _contacts = new BehaviorSubject<IContact[]>([]);
  private contactDataStore: { contacts: IContact[] } = { contacts: [] };
  readonly contacts = this._contacts.asObservable();

  private authStatusListener = new Subject<boolean>();
  private token: string;
  private userId: string;
  constructor(private httpClient: HttpClient) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUsers(): Observable<any> {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', 'Bearer ' + authToken);
    return this.httpClient.get('http://localhost:3000/api/users');
  }

  getUser(userId: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/api/users/' + userId);
  }

  addUser(user) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.httpClient.post('http://localhost:3000/api/users/register', user, {headers})
      .subscribe(
        res => {
          // console.log('type of response', typeof(res));
          // console.log(res);
          this.loadAll();
        },
        err => console.error(err)
      );
  }

  editUser(user): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(user);
    // const body = {
    //   role: user.role
    // };
    return this.httpClient.patch('http://localhost:3000/api/users/' + user._id, user, {headers});
  }

  loadAll() {
    this.httpClient.get<{
      _id: string;
      email: string;
      password: string;
      role: string;
    }[]>('http://localhost:3000/api/users').subscribe(allUsers => {
        this.userDataStore.users = allUsers;
        console.log('_users next is called, should updated subscribers!!!');
        this._users.next(Object.assign({}, this.userDataStore).users);
      }, err => console.log('Could not load users', err)
    );
  }

  loadAllContacts() {
    this.httpClient.get<IContact[]>('http://localhost:3000/api/contacts').subscribe(allContacts => {
      this.contactDataStore.contacts = allContacts;
      console.log('_contacts next is called, should updated subscribers!!!');
      this._contacts.next(Object.assign({}, this.contactDataStore).contacts);
      }, err => console.log('Could not load contacts', err)
    );
  }

  deleteUser(userID: string) {
    this.httpClient.delete('http://localhost:3000/api/users/' + userID).subscribe(res => {
      console.log(res);
      this.loadAll();
    },
    err => console.error(err));
  }

  loginUser(email: string, password: string) {
    const user = {
      email,
      password
    };
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post<{token: string, expiresIn: string, userId: string}>
      ('http://localhost:3000/api/users/login', user, {headers})
      .subscribe(
        res => {
          const token = res.token;
          this.token = token;
          if (token) {
            this.userId = res.userId;
            this.authStatusListener.next(true);
          }
        },
        err => {
          console.error(err);
          this.authStatusListener.next(false);
        }
      );
  }

  getContacts(): Observable<any> {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', 'Bearer ' + authToken);
    return this.httpClient.get('http://localhost:3000/api/contacts');
  }

  getContact(contactId: string): Observable<any> {
    return this.httpClient.get('http://localhost:3000/api/contacts/' + contactId);
  }

  addContact(contact) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    this.httpClient.post('http://localhost:3000/api/contacts', contact, {headers})
      .subscribe(
        res => {
          // console.log('type of response', typeof(res));
          // console.log(res);
          this.loadAllContacts();
        },
        err => console.error(err)
      );
  }

  deleteContact(contactID: string) {
    this.httpClient.delete('http://localhost:3000/api/contacts/' + contactID).subscribe(res => {
      console.log(res);
      this.loadAllContacts();
    },
    err => console.error(err));
  }

  editContact(contact): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    console.log(contact);
    // const body = {
    //   role: user.role
    // };
    return this.httpClient.patch('http://localhost:3000/api/contacts/' + contact._id, contact, {headers});
  }

}

// : Observable<any>
// return this.http.post(`${config.apiUrl}/users/register`, user, { headers }).pipe(map((res: any) => res));
