import { Component, Input } from '@angular/core';
import { IContact } from 'src/app/shared/models/contacts';
import { ContactsService } from '../../services/contacts.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {

  constructor(private contactService: ContactsService, private router: Router) {}

  @Input()contact: IContact;

  onEditContact(contactId: string) {
    this.router.navigate(['/user/edit/' + contactId], { queryParams: { returnUrl: this.router.routerState.snapshot.url }});
  }

  onDeleteContact(contactID) {
    this.contactService.deleteContact(contactID);
  }

}
