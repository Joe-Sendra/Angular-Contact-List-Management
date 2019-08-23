import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  hideError: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.hideError = true;
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user)
      .subscribe(
        res => {
          localStorage.setItem('id_token', res.token);
          this.router.navigate(['/' + res.role]);
        },
        err => {
          console.log(err);
          if (err.status === 401) {
            this.hideError = false;
          }
        }
      );
  }
}
