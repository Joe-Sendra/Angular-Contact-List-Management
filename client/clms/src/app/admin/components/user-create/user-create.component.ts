import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Role } from 'src/app/shared/models/roles';
import { UsersService } from 'src/app/user/services/users.service';
import { IUser } from 'src/app/shared/models/user';

@Component({
  templateUrl: './user-create.component.html'
})
export class UserCreateComponent implements OnInit {

  private _userID: string;
  form: FormGroup;
  mode = 'Create';
  user: IUser;
  email: string;
  password: string;
  role: Role = Role.user;
  returnUrl: string;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl;
    console.log(this.returnUrl);
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required]}),
      role: new FormControl(Role.user, {validators: [Validators.required]})
    });
    // Check route parameters to see if a user is being edited or created
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('userId')) {
        this.mode = 'Edit';
        console.log('You are in Edit mode');
        this.form.controls.password.disable();
        this._userID = paramMap.get('userId');
        this.userService.getUser(this._userID).subscribe(userData => {
          this.user = {
            _id: userData._id,
            email: userData.email,
            password: null,
            role: userData.role
          };
          this.form.setValue({
            email: this.user.email,
            password: this.user.password,
            role: this.user.role
          });
        });
      } else {
        this.mode = 'Create';
        console.log('You are in Create mode');
      }
    });
  }

  onSaveUser() {
    if (this.form.invalid) {
      console.log('this.form.invalid', this.form);
      return;
    }
    if (this.mode === 'Create') {
      const user = {
        email: this.form.value.email,
        password: this.form.value.password,
        role: this.form.value.role
      };
      this.userService.registerUser(user).subscribe(
        res => {
          console.log('TODO update user Subject (user added)', res);
        },
        err => {
          if (!err.isUsernameAvailable) {
            // TODO
            console.log('TODO error for user already exists');
          }
        }
      );
    } else {
      const user = {
        _id: this._userID,
        email: this.form.value.email,
        role: this.form.value.role
      };
      this.userService.editUser(user).subscribe(res => {}, err => console.error(err));
      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.router.navigate(['/admin/users']);
      }
    }
    this.form.reset({ role: Role.user });
  }

}
