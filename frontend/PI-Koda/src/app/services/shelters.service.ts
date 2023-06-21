import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {
  private _endpointShelters = '/shelters';

  constructor(private _apiService: ApiService, private _http: HttpClient) { }

  //GET
  public get(page: number): Observable<any> {
    return this._apiService.get(`${this._endpointShelters}?page=${page}`);
  }

  public getShelterById(id: string): Observable<any> {
    return this._apiService.get(`${this._endpointShelters}/${id}`);
  }

  public getShelterByUserId(userId: string): Observable<any> {
    return this._apiService.get(`${this._endpointShelters}/byUser/${userId}`);
  }

  public filterShelters(parameters: any): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/filterShelters`, {params: parameters});
  }

  //POST
  public post(body: Object): Observable<any> {
    return this._apiService.post(`${this._endpointShelters}`, body);
  }

  //PUT
  public put(id: string, body: Object): Observable<any> {
    return this._apiService.put(`${this._endpointShelters}/${id}`, body);
  }

  //DELETE
  public delete(id: string): Observable<any> {
    return this._apiService.delete(`${this._endpointShelters}/${id}`);
  }
}
