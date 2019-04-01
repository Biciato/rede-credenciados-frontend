import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { PessoaFisica } from '../../models/pessoa-fisica';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class PessoaFisicaService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) {}

    register(pessoa_fisica: PessoaFisica) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json'
        })};
        return this.http.post<PessoaFisica>(this.baseUrl + '/register-pf', pessoa_fisica, httpOptions);
    }

    getPessoaFisica(id, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.get<PessoaFisica>(this.baseUrl + `/pessoa-fisica/${id}`, httpOptions);
    }

    getPessoaFisicaResumo(id) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json'
        })};
        return this.http.get(this.baseUrl + `/pessoa-fisica-resumo/${id}`, httpOptions);
    }

    update(id, dados, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};

        return this.http.put<PessoaFisica>(this.baseUrl + `/pessoa-fisica/${id}`, dados, httpOptions);
    }
}

