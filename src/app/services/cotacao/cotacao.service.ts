import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class CotacaoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  create(cotacao) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json'
    })};
    return this.http.post(this.baseUrl + '/cotacao', cotacao, httpOptions);
  }

  getCotacoes(local, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.post<any>(this.baseUrl + '/cotacao-user', local, httpOptions);
  }

  setCotAsRead(id, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.post<any>(this.baseUrl + '/cotacao-lida', id, httpOptions);
  }

  setCotAsReadCol(ids, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.post<any>(this.baseUrl + '/cotacao-lida-col', ids, httpOptions);
  }

  setCotAsUnreadCol(ids, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.put<any>(this.baseUrl + '/cotacao-lida-col-unread', ids, httpOptions);
  }

  getCotRead(id, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    })};
    return this.http.get(this.baseUrl + `/cotacao-lida/${id}`, httpOptions);
  }
}
