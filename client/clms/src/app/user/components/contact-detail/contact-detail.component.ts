import { Component, Input } from '@angular/core';
import { IContact } from 'src/app/shared/models/contacts';
import { ContactsService } from '../../services/contacts.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {

  constructor(private contactService: ContactsService) {}

  @Input()contact: IContact;

  onDeleteContact(contactID) {
    this.contactService.deleteContact(contactID);
  }

}
