import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IContact } from 'src/app/shared/models/contacts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl + '/contacts/';

@Injectable()
export class ContactsService {
  private _contacts = new BehaviorSubject<IContact[]>([]);
  private contactDataStore: {contacts: IContact[] } = { contacts: [] };

  constructor(private httpClient: HttpClient) {}

  getContactsListener() {
    return this._contacts.asObservable();
  }

  getContacts(): Observable<any> {
    return this.httpClient.get(`${BACKEND_URL}`);
  }

  getContact(contactId: string): Observable<any> {
    return this.httpClient.get(`${BACKEND_URL}` + contactId);
  }

  addContact(contact) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(`${BACKEND_URL}`, contact, {headers})
      .subscribe(
        res => {
          this.loadAllContacts();
        });
  }

  editContact(contact): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.patch(`${BACKEND_URL}` + contact._id, contact, {headers});
  }

  deleteContact(contactID: string) {
    this.httpClient.delete(`${BACKEND_URL}` + contactID).subscribe(res => {
      this.loadAllContacts();
    });
  }

  loadAllContacts() {
    this.httpClient.get<IContact[]>(`${BACKEND_URL}`).subscribe(allContacts => {
      this.contactDataStore.contacts = allContacts;
      this._contacts.next(Object.assign({}, this.contactDataStore).contacts);
      });
  }

}
