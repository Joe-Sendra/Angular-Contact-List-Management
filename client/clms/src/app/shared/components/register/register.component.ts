import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidateService } from '../../services/validate/validate.service';
import { UsersService } from 'src/app/user/services/users.service';
import { Role } from '../../models/roles';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  display: string;
  newRegisteredUser: {email: string; password: string; role: Role};
  constructor(private validateService: ValidateService,
              private userService: UsersService,
              private authService: AuthService) { }

  ngOnInit() {
    this.display = 'none';
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, { validators: [Validators.required]})
    });
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onRegisterSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }

    const user = {
      email: this.form.value.email,
      password: this.form.value.password,
      role: Role.user
    };

    // // Required Fields
    // if (!this.validateService.validateRegister(user)) {
    //   alert('Fill in all fields'); // FIXME
    //   return false;
    // }

    this.userService.registerUser(user)
      .subscribe(
        res => {
          localStorage.setItem('id_token', res.token);
          this.display = 'block';
          this.newRegisteredUser = user;
        }
      );
  }

  autoLogin(user) {
    this.authService.authenticateUser(user, null);
  }

}
