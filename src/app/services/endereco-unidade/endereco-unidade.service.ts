import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Endereco } from '../../models/endereco';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class EnderecoUnidadeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get(id, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.get<Endereco>(this.baseUrl + `/endereco-unidade/${id}`, httpOptions);
  }

  update(id, address, token) {
    const httpOptions = { headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + token
    })};
    return this.http.put<Endereco>(this.baseUrl + `/endereco-unidade/${id}`, address, httpOptions);
  }
}
