import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IContact } from 'src/app/shared/models/contacts';
import { ContactsService } from '../../services/contacts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './contact-create.component.html'
})
export class ContactCreateComponent implements OnInit {

  private _contactID: string;
  form: FormGroup;
  mode = 'Create';
  contact: IContact;

  constructor(
    private contactService: ContactsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, {validators: [Validators.required]}),
      middleName: new FormControl(null),
      lastName: new FormControl(null),
      nameSuffix: new FormControl(null),
      emailHome: new FormControl(null),
      emailWork: new FormControl(null),
      addressHomeStreet: new FormControl(null),
      addressHomeCity: new FormControl(null),
      addressHomeState: new FormControl(null),
      addressHomeZipcode: new FormControl(null),
      addressWorkStreet: new FormControl(null),
      addressWorkCity: new FormControl(null),
      addressWorkState: new FormControl(null),
      addressWorkZipcode: new FormControl(null),
      addressOtherStreet: new FormControl(null),
      addressOtherCity: new FormControl(null),
      addressOtherState: new FormControl(null),
      addressOtherZipcode: new FormControl(null),
      phoneMobile: new FormControl(null),
      phoneHome: new FormControl(null),
      phoneWork: new FormControl(null),
      phoneOther: new FormControl(null)
    });

    // Check route parameters to see if a user is being edited or created
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('contactId')) {
        this.mode = 'Edit';
        console.log('You are in Edit mode');
        this._contactID = paramMap.get('contactId');
        this.contactService.getContact(this._contactID).subscribe((contactData: IContact) => {
          console.log(contactData);
          this.contact = {
            _id: contactData[0]._id,
            address: {
              home: {
                street: contactData[0].address.home.street,
                city: contactData[0].address.home.city,
                state: contactData[0].address.home.state,
                zipcode: contactData[0].address.home.zipcode
              },
              work: {
                street: contactData[0].address.work.street,
                city: contactData[0].address.work.city,
                state: contactData[0].address.work.state,
                zipcode: contactData[0].address.work.zipcode
              },
              other: {
                street: contactData[0].address.other.street,
                city: contactData[0].address.other.city,
                state: contactData[0].address.other.state,
                zipcode: contactData[0].address.other.zipcode
              }
            },
            name: {
              first: contactData[0].name.first,
              last: contactData[0].name.last,
              middle: contactData[0].name.middle,
              suffix: contactData[0].name.suffix
            },
            email: {
              home: contactData[0].email.home,
              work: contactData[0].email.work
            },
            phone: {
              mobile: contactData[0].phone.mobile,
              home: contactData[0].phone.home,
              work: contactData[0].phone.work,
              other: contactData[0].phone.other
            }
          };
          this.form.setValue({
            addressHomeStreet: this.contact.address.home.street,
            addressHomeCity: this.contact.address.home.city,
            addressHomeState: this.contact.address.home.state,
            addressHomeZipcode: this.contact.address.home.zipcode,
            addressWorkStreet: this.contact.address.work.street,
            addressWorkCity: this.contact.address.work.city,
            addressWorkState: this.contact.address.work.state,
            addressWorkZipcode: this.contact.address.work.zipcode,
            addressOtherStreet: this.contact.address.other.street,
            addressOtherCity: this.contact.address.other.city,
            addressOtherState: this.contact.address.other.state,
            addressOtherZipcode: this.contact.address.other.zipcode,
            firstName: this.contact.name.first,
            lastName: this.contact.name.last,
            middleName: this.contact.name.middle,
            nameSuffix: this.contact.name.suffix,
            emailHome: this.contact.email.home,
            emailWork: this.contact.email.work,
            phoneMobile: this.contact.phone.mobile,
            phoneHome: this.contact.phone.home,
            phoneWork: this.contact.phone.work,
            phoneOther: this.contact.phone.other
          });
      });
     } else {
        this.mode = 'Create';
        console.log('You are in Create mode');
      }
    });
  }

  onSaveContact() {
    console.log('this.mode: ', this.mode);
    if (this.form.invalid) {
      console.log('this.form.invalid', this.form);
      return;
    }
    const contact = {
      _id: null,
      address: {
        home: {
          street: this.form.value.addressHomeStreet,
          city: this.form.value.addressHomeCity,
          state: this.form.value.addressHomeState,
          zipcode: this.form.value.addressHomeZipcode
        },
        work: {
          street: this.form.value.addressWorkStreet,
          city: this.form.value.addressWorkCity,
          state: this.form.value.addressWorkState,
          zipcode: this.form.value.addressWorkZipcode
        },
        other: {
          street: this.form.value.addressOtherStreet,
          city: this.form.value.addressOtherCity,
          state: this.form.value.addressOtherState,
          zipcode: this.form.value.addressOtherZipcode
        }
      },
      name: {
        first: this.form.value.firstName,
        last: this.form.value.lastName,
        middle: this.form.value.middleName,
        suffix: this.form.value.nameSuffix
      },
      email: {
        home: this.form.value.emailHome,
        work: this.form.value.emailWork
      },
      phone: {
        mobile: this.form.value.phoneMobile,
        home: this.form.value.phoneHome,
        work: this.form.value.phoneWork,
        other: this.form.value.phoneOther
      }
    };
    console.log('this.mode: ', this.mode);
    if (this.mode === 'Create') {
      console.log('Creating contact...');
      this.contactService.addContact(contact);
    } else {
      contact._id = this._contactID;
      console.log('Updating contact...');
      this.contactService.editContact(contact).subscribe(res => {}, err => console.error(err));
    }
    this.form.reset();
  }

}
