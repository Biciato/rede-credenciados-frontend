import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Apresentacao } from '../../models/apresentacao';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ResumeService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    register(pessoa) {
        if (pessoa.tipo_pessoa === 'pessoa_fisica') {
            return this.http.post<Apresentacao>(this.baseUrl + '/register-apresentacao-pf',
                {
                    id: pessoa.id,
                },
                { headers: {'Content-Type': 'application/json'}}
            );
        } else {
            return this.http.post(this.baseUrl + '/register-apresentacao-pj',
                {
                    id: pessoa.id,
                },
                { headers: {'Content-Type': 'application/json'}}
            );
        }
    }

    get(id, tipo_pessoa, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        if (tipo_pessoa === 'pessoa_fisica') {
            return this.http.get<Apresentacao>(this.baseUrl + `/apresentacao-pf/${id}`, httpOptions);
        } else {
            return this.http.get<Apresentacao>(this.baseUrl + `/apresentacao-pj/${id}`, httpOptions);
        }
    }

    update(id, apresentacao, tipo_pessoa, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        if (tipo_pessoa === 'pessoa_fisica') {
            return this.http.put<Apresentacao>(this.baseUrl + `/apresentacao-pf/${id}`,
                {apresentacao: apresentacao}, httpOptions);
        } else {
            return this.http.put<Apresentacao>(this.baseUrl + `/apresentacao-pj/${id}`,
                {apresentacao: apresentacao}, httpOptions);
        }
    }
}

