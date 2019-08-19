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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(user).subscribe(data => {
      if ((data as any).success) {
        this.authService.storeUserData(data.token, data.user);
        if (data.user.role === 'admin') {
          this.router.navigate(['admin']);
        } else {
          this.router.navigate(['user']);
        }
      } else {
        console.log(data, 'TODO Send message to user not authenticated');
        this.router.navigate(['login']);
      }
    });
  }

}
