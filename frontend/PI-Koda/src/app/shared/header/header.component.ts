import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user!: User;

  isShelterUser: boolean = false;

  constructor(
    private _router: Router,
    private _loginService: LoginService,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.isShelterUser = this.user.user_role === 'shelter' ? true : false;
  }

  logout() {
    this._loginService.logout();
    this._router.navigate(['/login']);
  }

  getUser() {
    this.user = this._userService.get();
  }
}
