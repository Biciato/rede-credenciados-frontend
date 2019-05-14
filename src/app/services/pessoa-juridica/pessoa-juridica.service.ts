import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PessoaJuridica } from '../../models/pessoa-juridica';

import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PessoaJuridicaService {
  private pjId = new Subject<number>();

  pjId$ = this.pjId.asObservable();

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  passPjId(id: number) {
    this.pjId.next(id);
  }

  register(pessoaJuridica: PessoaJuridica) {

    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json'
    })};

    return this.http.post<PessoaJuridica>(this.baseUrl + '/register-pj', pessoaJuridica, httpOptions);
  }

  getPessoaJuridica(id, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    })};

    return this.http.get<PessoaJuridica>(this.baseUrl + `/pessoa-juridica/${id}`, httpOptions);
  }

  getPessoaJuridicaResumo(id) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json'
    })};
    return this.http.get(this.baseUrl + `/pessoa-juridica-resumo/${id}`, httpOptions);
  }

  update(id, dados, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    })};

    return this.http.put<PessoaJuridica>(this.baseUrl + `/pessoa-juridica/${id}`, dados, httpOptions);
  }
}
