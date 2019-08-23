import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class AdminComponent implements OnInit {

  currentUser: string;
  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
    this.currentUser = this.auth.currentUser.username;
    this.router.navigate(['admin/home']);
  }

}
