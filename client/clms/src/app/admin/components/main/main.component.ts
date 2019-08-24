import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';


@Component({
  selector: 'app-admin-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit() {
  }

}
