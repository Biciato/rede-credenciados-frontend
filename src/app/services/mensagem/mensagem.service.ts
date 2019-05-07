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

    mensagensUser(id, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.get<Mensagem[]>(this.baseUrl + `/mensagens/${id}`, httpOptions);
    }

    setAsRead(id, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.put(this.baseUrl + `/mensagens/${id}`, {mensagem_lida: 1}, httpOptions);
    }

    setAsReadCol(ids, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.put(this.baseUrl + `/mensagens`, {mensagem_ids: ids}, httpOptions);
    }

    setAsUnreadCol(ids, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.put(this.baseUrl + `/mensagens-unread`, {mensagem_ids: ids}, httpOptions);
    }
}
