import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/retry';

import { Unidade } from '../../models/unidade';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class UnityService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {

  }

  list(id, token): Observable<Unidade[]> {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};

    return this.http.get<Unidade[]>(this.baseUrl + `/unidades/${id}`, httpOptions);
  }

  update(id, dados, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};

    return this.http.put<Unidade>(this.baseUrl + `/unidade/${id}`, dados, httpOptions);
  }

  checkCnpj(cnpj) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json'
    })};

    return this.http.post<Unidade>(this.baseUrl + '/check-cnpj-unidade', {cnpj: cnpj}, httpOptions);
  }
}
