import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  //GET
  public get(path: string): Observable<any>{
    return this.http.get(`${environment.apiUrl}${path}`);
  }

  //POST
  public post(path: string, body: Object): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    return this.http.post(`${environment.apiUrl}${path}`, JSON.stringify(body), options);
  }

  //PUT
  public put(path: string, body: Object): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    return this.http.put(`${environment.apiUrl}${path}`, JSON.stringify(body), options);
  }

  //DELETE
  public delete(path: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}${path}`);
  }
}
