import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class PagseguroService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  checkout(data) {
    return this.http.post(this.baseUrl + '/pagseguro-checkout', data, data);
  }
}
