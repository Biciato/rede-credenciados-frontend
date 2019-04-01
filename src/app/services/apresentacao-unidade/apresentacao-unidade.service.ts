import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Apresentacao } from '../../models/apresentacao';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ApresentacaoUnidadeService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    get(id, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.get<Apresentacao>(this.baseUrl + `/apresentacao-unidade/${id}`, httpOptions);
    }

    update(id, apresentacao, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.put<Apresentacao>(this.baseUrl + `/apresentacao-unidade/${id}`,
            {apresentacao: apresentacao}, httpOptions);
    }
}
