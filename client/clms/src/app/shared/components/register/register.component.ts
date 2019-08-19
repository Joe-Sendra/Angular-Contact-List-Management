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

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
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

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if ((data as any).success) {
        alert('Username has been registered, please login');
        this.router.navigate(['/login']);
      } else {
        alert('Unable to register user, please try again');
        this.router.navigate(['/register']);
      }
    });
  }
}
