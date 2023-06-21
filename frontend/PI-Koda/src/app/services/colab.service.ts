import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ColabService {
  private _endpointColab = '/shelters';

  constructor(private _apiService: ApiService) { }

  public get() {
    return this._apiService.get(`${this._endpointColab}`);
  }
}
