import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Endereco } from '../../models/endereco';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AddressService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    register(pessoa) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json'
        })};
        if (pessoa.tipo_pessoa === 'pessoa_fisica') {
            return this.http.post<Endereco>(this.baseUrl + '/register-endereco-pf', httpOptions);
        } else {
            return this.http.post<Endereco>(this.baseUrl + '/register-endereco-pj', httpOptions);
        }
    }

    get(id, tipo_pessoa, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        if (tipo_pessoa === 'pessoa_fisica') {
            return this.http.get<Endereco>(this.baseUrl + `/endereco-pf/${id}`, httpOptions);
        } else {
            return this.http.get<Endereco>(this.baseUrl + `/endereco-pj/${id}`, httpOptions);
        }
    }

    update(id, address, tipo_pessoa, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        if (tipo_pessoa === 'pessoa_fisica') {
            return this.http.put<Endereco>(this.baseUrl + `/endereco-pf/${id}`, address, httpOptions);
        } else {
            return this.http.put<Endereco>(this.baseUrl + `/endereco-pj/${id}`, address, httpOptions);
        }
    }
}
