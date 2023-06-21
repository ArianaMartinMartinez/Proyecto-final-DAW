import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environment/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loginUrl = `${environment.apiUrl}/login`;
  private logoutUrl = `${environment.apiUrl}/logout`;

  constructor(private _http: HttpClient) {}

  login(credentials: Object) {
    return this._http.post<any>(this.loginUrl, credentials);
  }

  logout() {
    this._http.get(this.logoutUrl).subscribe({
      next: (rtn) => {
        localStorage.removeItem('user_token');
        localStorage.removeItem('user');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
