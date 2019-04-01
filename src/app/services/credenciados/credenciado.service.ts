import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

import { Credenciado } from '../../models/credenciado';

@Injectable({providedIn: 'root'})
export class CredenciadosService {
    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    index() {
        return this.http.get<Credenciado[]>(this.baseUrl + '/credenciados');
    }

    delete(id, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.delete(this.baseUrl + '/user/' + id, httpOptions);
    }
}
