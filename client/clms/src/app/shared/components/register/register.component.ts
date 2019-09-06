import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/user/services/users.service';
import { Role } from '../../models/roles';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string;
  password: string;
  display: string;
  newRegisteredUser: {email: string; password: string; role: Role};
  constructor(private validateService: ValidateService,
              private userService: UsersService,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.display = 'none';
  }

  onRegisterSubmit() {
    const user = {
      email: this.email,
      password: this.password,
      role: Role.user
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      alert('Fill in all fields'); // FIXME
      return false;
    }

    this.userService.registerUser(user)
      .subscribe(
        res => {
          console.log('TODO update user Subject (user added)', res);
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
