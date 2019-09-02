import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  hideError: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.hideError = true;
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    };

    this.authService.authenticateUser(user)
      .subscribe(
        res => {
          console.log(res);
          localStorage.setItem('id_token', res.token);
          console.log(res.role);
          this.router.navigate(['/' + res.role]);
          // this.router.navigate([res.role]);
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
