import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PesquisaCliente } from '../../models/pesquisa-cliente';

import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PesquisaClientesService {
  private pesquisaClienteSource = new Subject<PesquisaCliente>();

  baseUrl = environment.baseUrl;

  pesquisaCliente$ = this.pesquisaClienteSource.asObservable();

  constructor(private http: HttpClient) { }

  pesquisa(local) {

    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json'
    })};
    return this.http.post<PesquisaCliente>(this.baseUrl + '/pesquisa-clientes', local, httpOptions);
  }

  sendPesqClt(dados: PesquisaCliente) {
    this.pesquisaClienteSource.next(dados);
  }
}
