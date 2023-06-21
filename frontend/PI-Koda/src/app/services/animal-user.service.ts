import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalUserService {
  private _endpointAnimalUser = '/animalUser';

  constructor(private _apiService: ApiService) { }

  //GET
  public get(userId: string): Observable<any> {
    return this._apiService.get(`${this._endpointAnimalUser}/${userId}`);
  }

  //POST
  public post(body: Object): Observable<any> {
    return this._apiService.post(`${this._endpointAnimalUser}`, body);
  }

  //PUT
  public put(id: string, body: Object): Observable<any> {
    return this._apiService.put(`${this._endpointAnimalUser}/${id}`, body);
  }

  //DELETE
  public delete(animalId: string, userId: string): Observable<any> {
    return this._apiService.delete(`${this._endpointAnimalUser}/${animalId}/${userId}`);
  }
}
