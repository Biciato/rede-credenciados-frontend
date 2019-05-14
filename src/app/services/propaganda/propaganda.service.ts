import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Propaganda } from '../../models/propaganda';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PropagandaService {


  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  showPropPJ(id, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    })};
    return this.http.get<Propaganda>(this.baseUrl + `/propaganda-pj/${id}`, httpOptions);
  }

  showPropUni(id, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    })};
    return this.http.get<Propaganda>(this.baseUrl + `/propaganda-unidade/${id}`, httpOptions);
  }

  createPropPJ(id, propaganda, token) {
    propaganda.id = id;
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    })};
    return this.http.post(this.baseUrl + '/propaganda-pj', propaganda, httpOptions);
  }

  createPropUser(id, propaganda) {
    propaganda.id = id;
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json'
    })};
    return this.http.post(this.baseUrl + '/propaganda-user', propaganda, httpOptions);
  }

  updatePropPJ(id, propaganda, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    })};
    return this.http.put(this.baseUrl + `/propaganda-pj/${id}`, propaganda, httpOptions);
  }

  updatePropUni(id, propaganda, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + token
    })};
    return this.http.put(this.baseUrl + `/propaganda-unidade/${id}`, propaganda, httpOptions);
  }

  index(cidade, estado) {
    return this.http.get(this.baseUrl + `/propagandas/${cidade}/${estado}`);
  }

  indexSimpleUsers(cidade, estado) {
    return this.http.get(this.baseUrl + `/propagandas-simple-user/${cidade}/${estado}`);
  }
}
