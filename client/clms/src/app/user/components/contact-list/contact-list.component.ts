import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { IContact } from 'src/app/shared/models/contacts';
import { ContactsService } from '../../services/contacts.service';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './contact-list.component.html'
})
export class ContactListComponent implements OnInit, OnDestroy {
  private contactSubscription: Subscription;
  contacts: IContact[];
  constructor(private contactService: ContactsService) { }

  ngOnInit() {
    this.contactSubscription = this.contactService.getContactsListener().subscribe(
      updatedContacts => { this.contacts = updatedContacts; });
    this.contactService.getContacts().pipe(take(1)).subscribe(contactsData => {
      this.contacts = contactsData;
    });
  }

  ngOnDestroy() {
    this.contactSubscription.unsubscribe();
  }

}
