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
      console.log('Fill in all fields');
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      console.log('TODO: show success or error message to user');
      if ((data as any).success) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/register']);
      }
    });
  }
}
