import { Component, Input } from '@angular/core';
import { IContact } from 'src/app/shared/models/contacts';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent {

  @Input()contact: IContact;

  onDeleteContact(contact) {

  }

}
