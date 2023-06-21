import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private _endpointBlog = '/articles';

  constructor(private _apiService: ApiService) { }

  //GET
  public get(): Observable<any> {
    return this._apiService.get(`${this._endpointBlog}`);
  }

  public getBlogById(id: string): Observable<any> {
    return this._apiService.get(`${this._endpointBlog}/${id}`);
  }

  //POST
  public post(body: Object): Observable<any> {
    return this._apiService.post(`${this._endpointBlog}`, body);
  }

  //PUT
  public put(id: string, body: Object): Observable<any> {
    return this._apiService.put(`${this._endpointBlog}/${id}`, body);
  }

  //DELETE
  public delete(id: string): Observable<any> {
    return this._apiService.delete(`${this._endpointBlog}/${id}`);
  }
}
