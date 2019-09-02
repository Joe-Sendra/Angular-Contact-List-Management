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
  readonly contacts = this._contacts.asObservable();

  constructor(private httpClient: HttpClient) {}

  getContacts(): Observable<any> {
    // const headers = new HttpHeaders();
    // headers.set('Authorization', 'Bearer ' + authToken);
    return this.httpClient.get(`${BACKEND_URL}`);
  }

  loadAllContacts() {
    this.httpClient.get<IContact[]>(`${BACKEND_URL}`).subscribe(allContacts => {
      this.contactDataStore.contacts = allContacts;
      console.log('_contacts next is called, should updated subscribers!!!');
      this._contacts.next(Object.assign({}, this.contactDataStore).contacts);
      }, err => console.log('Could not load contacts', err)
    );
  }

}
