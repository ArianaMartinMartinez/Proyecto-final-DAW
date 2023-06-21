import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private _endpointCities = '/cities';

  constructor(private _apiService: ApiService) { }

  //GET
  public get(): Observable<any> {
    return this._apiService.get(`${this._endpointCities}`);
  }

  public getCityById(id: string): Observable<any> {
    return this._apiService.get(`${this._endpointCities}/${id}`);
  }
}
