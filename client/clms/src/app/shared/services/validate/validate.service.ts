import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.email === undefined ||
       user.password === undefined ||
       user.role === undefined ||
       user.email === '' ||
       user.password === '' ||
       user.role === '') {
      return false;
    } else {
      return true;
    }
  }
}
