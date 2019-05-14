import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class InitialRegisterUnidadeService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register(unidade) {
    return this.http.post(this.baseUrl + '/registro-inicial-unidade', unidade,
      {
        headers: { 'Content-type': 'application/json'}
      }
    );
  }

  checkCnpj(cnpj) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json'
    })};
    return this.http.post(this.baseUrl + '/check-cnpj-unidade', {cnpj: cnpj}, httpOptions);
  }
}
