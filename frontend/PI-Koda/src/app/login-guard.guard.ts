import { Injectable } from '@angular/core';
import { CanActivate, Router, } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {  
  constructor(private _router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('user_token');

    if(token) {
      return true;
    } else {
      this._router.navigate(['login']);
      return false;
    }
  }
}
