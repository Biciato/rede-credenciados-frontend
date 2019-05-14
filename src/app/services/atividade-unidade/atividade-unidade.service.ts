import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Atividades } from '../../models/atividades';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AtividadeUnidadeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  get(id, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.get<Atividades>(this.baseUrl + `/atividade-unidade/${id}`, httpOptions);
  }

  update(id, atividades, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.put<Atividades>(this.baseUrl + `/atividade-unidade/${id}`,
      {atividades: atividades}, httpOptions);
  }
}
