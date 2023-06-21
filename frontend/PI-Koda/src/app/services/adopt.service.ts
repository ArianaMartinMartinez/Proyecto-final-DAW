import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdoptService {

  private _endpointAdopt = '/animals';

  constructor(private _apiService: ApiService, private _http: HttpClient) { }

  //GET
  public get(page: number): Observable<any> {
    return this._apiService.get(`${this._endpointAdopt}?page=${page}`);
  }

  public getAnimalById(id: string): Observable<any> {
    return this._apiService.get(`${this._endpointAdopt}/${id}`);
  }

  public filterAnimals(parameters: any): Observable<any> {
    return this._http.get<any>(`${environment.apiUrl}/filterAnimals`, {params: parameters});
  }

  //POST
  public post(body: Object): Observable<any> {
    return this._apiService.post(`${this._endpointAdopt}`, body);
  }

  //PUT
  public put(id: string, body: Object): Observable<any> {
    return this._apiService.put(`${this._endpointAdopt}/${id}`, body);
  }

  //DELETE
  public delete(id: string): Observable<any> {
    return this._apiService.delete(`${this._endpointAdopt}/${id}`);
  }
}
