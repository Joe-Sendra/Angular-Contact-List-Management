import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SandboxService } from './sandbox.service';
import { take } from 'rxjs/operators';
import { IContact } from '../shared/models/contacts';
import { Role } from '../shared/models/roles';

@Component({
  templateUrl: './sandbox.component.html',
  styles: ['body {margin-left: 40px;}', 'input {width: 300px;}']
})
export class SandboxComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  private userCounter = 2;
  private authStatusSub: Subscription;
  public users: {
    _id: string;
    email: string;
    password: string;
    role: string;
  }[];

  private contactSubscription: Subscription;
  public contacts: IContact[];
  singleContactLookup: IContact;
  contactID: string;
  private contactCounter = 2;

  singleUserLookup: {
    _id: string;
    email: string;
    password: string;
    role: string;
  };
  userID: string;
  userRole: string;
  email: string;
  password: string;
  currentUser = {userId: null, token: null};


  constructor(private sandboxService: SandboxService) {}

  ngOnInit(): void {
    this.userSubscription = this.sandboxService.users.subscribe(updatedUsers => {
      this.users = updatedUsers;
    });

    // this.sandboxService.getUsers().pipe(take(1)).subscribe(
    //   () => {},
    //   err => console.error(err));

    this.contactSubscription = this.sandboxService.contacts.subscribe(updatedContacts => {
      this.contacts = updatedContacts;
    });

    this.authStatusSub = this.sandboxService.getAuthStatusListener().subscribe(
      authStatus => {
        if (authStatus) {
          this.currentUser.token = this.sandboxService.getToken(); // need do get token
          this.currentUser.userId = this.sandboxService.getUserId(); // need to get email
        } else {
          this.currentUser.token = null;
          this.currentUser.userId = null;
        }
      }
    );
  }

  tryAddUser() {
    const user = {
      email: 'lynn' + this.userCounter + '@lynn.com',
      password: 'lynn' + this.userCounter,
      role: 'User'
    };
    this.userCounter++;
    this.sandboxService.addUser(user);
  }

  deleteUser(userId) {
    this.sandboxService.deleteUser(userId);
  }

  getUsers() {
    this.sandboxService.getUsers().pipe(take(1)).subscribe(usersData => {
      this.users = usersData;
    }, err => console.error(err));
  }

  getUser() {
    this.sandboxService.getUser(this.userID).pipe(take(1)).subscribe(userData => {
      this.singleUserLookup = userData;
    }, err => console.error(err));
  }

  editUser(user, newRole) {
    const userEdit = user;
    if (newRole === 'admin') {
      userEdit.role = Role.admin;
    }
    if (newRole === 'user') {
      userEdit.role = Role.user;
    }

    this.sandboxService.editUser(userEdit).subscribe(res => {
    }, err => console.error(err));
  }

  loginUser() {
    this.sandboxService.loginUser(this.email, this.password);
        // this.currentUser = {userId: res.userId, token: res.token};
  }

  getContacts() {
    this.sandboxService.getContacts().pipe(take(1)).subscribe(contactsData => {
      this.contacts = contactsData;
    }, err => console.error(err));
  }

  getContact() {
    this.sandboxService.getContact(this.contactID).pipe(take(1)).subscribe(contactData => {
      this.singleContactLookup = contactData;
    }, err => console.error(err));
  }

  tryAddContact() {
    const contact = {
      name: {
          first: 'Joseph' + this.contactCounter,
          last: 'Sendra',
          middle: 'Alan',
          suffix: 'Sr.'
      },
      email: {
          home: 'joe.sendra@gmail.com',
          work: 'jsendra@hallmarktops.com'
      },
      phone: {
          mobile: '708-516-7721',
          home: '',
          work: '',
          other: ''
      },
      address: {
          home: {
              street: '251 Switchgrass Dr',
              city: 'Minooka',
              state: 'IL',
              zipcode: '60447'
          },
          work: {
              street: '',
              city: '',
              state: '',
              zipcode: ''
          },
          other: {
              street: '',
              city: '',
              state: '',
              zipcode: ''
          }
      }
  };
    this.contactCounter++;
    this.sandboxService.addContact(contact);
  }

  deleteContact(contactId) {
    this.sandboxService.deleteContact(contactId);
  }

  editContact(contact: IContact, updateType) {
    const contactEdit = contact;
    if (updateType === 'upper') {
      contactEdit.name.first = contactEdit.name.first.toUpperCase();
      contactEdit.name.middle = contactEdit.name.middle.toUpperCase();
      contactEdit.name.last = contactEdit.name.last.toUpperCase();
      contactEdit.name.suffix = contactEdit.name.suffix.toUpperCase();
    }
    if (updateType === 'lower') {
      contactEdit.name.first = contactEdit.name.first.toLowerCase();
      contactEdit.name.middle = contactEdit.name.middle.toLowerCase();
      contactEdit.name.last = contactEdit.name.last.toLowerCase();
      contactEdit.name.suffix = contactEdit.name.suffix.toLowerCase();
    }
    this.sandboxService.editContact(contactEdit).subscribe(res => {
    }, err => console.error(err));
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.contactSubscription.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
