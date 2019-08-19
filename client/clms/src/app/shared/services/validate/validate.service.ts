import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if ((user.username === undefined || user.password === undefined) || user.username === '' || user.password === '') {
      return false;
    } else {
      return true;
    }
  }
}
