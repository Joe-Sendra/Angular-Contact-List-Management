import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate/validate.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  password: string;
  hideError: boolean;
  display: string;
  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.hideError = true;
    this.display = 'none';
  }

  onRegisterSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      alert('Fill in all fields');
      return false;
    }

    this.authService.registerUser(user)
      .subscribe(
        res => {
          localStorage.setItem('id_token', res.token);
          this.display = 'block';

        },
        err => {
          if (!err.isUsernameAvailable) {
            this.hideError = false;
          }
        }
      );
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
