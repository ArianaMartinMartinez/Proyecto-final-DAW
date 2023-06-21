import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _endpointUser = '/users';

  constructor(private _apiService: ApiService) { }

  //GET
  public get() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  //POST
  public post(body: Object): Observable<any> {
    return this._apiService.post(`${this._endpointUser}`, body);
  }

  //PUT
  public put(id: string, body: Object): Observable<any> {
    return this._apiService.put(`${this._endpointUser}/${id}`, body);
  }

  public putPass(id: string, body: Object): Observable<any> {
    return this._apiService.put(`${this._endpointUser}/updatePass`, body);
  }

  //DELETE
  public delete(id: string): Observable<any> {
    return this._apiService.delete(`${this._endpointUser}/${id}`);
  }
}
