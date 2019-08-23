import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['user/home']);
  }

}
