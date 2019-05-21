import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Mensagem } from '../../models/mensagem';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class MensagemService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  create(message, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.post(this.baseUrl + '/mensagem', message, httpOptions);
  }

  mensagensUser(user) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    })};
    return this.http.get<Mensagem[]>(
      this.baseUrl + `/mensagens/${user.id}/${user.personType}`, httpOptions
    );
  }

  setAsRead(id, user) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    })};
    return this.http.put(this.baseUrl + `/mensagem/${id}`, {mensagem_lida: user.id}, httpOptions);
  }

  setAsReadCol(ids, user) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    })};
    return this.http.put(this.baseUrl + `/mensagens/${user.id}`, {mensagem_ids: ids}, httpOptions);
  }

  setAsUnreadCol(ids, user) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + user.token
    })};
    return this.http.put(this.baseUrl + `/mensagens-unread/${user.id}`, {mensagem_ids: ids}, httpOptions);
  }
}
