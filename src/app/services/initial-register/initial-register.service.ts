import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class InitialRegisterService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    register(pessoa, atividades) {
        if (pessoa.cpf) {
            return this.http.post(this.baseUrl + '/registro-inicial-pf',
                {
                    id: pessoa.id,
                    atividades: atividades
                },
                {
                    headers: { 'Content-type': 'application/json'}
                }
            );
        } else {
            return this.http.post(this.baseUrl + '/registro-inicial-pj',
                {
                    id: pessoa.id,
                    atividades: atividades
                },
                {
                    headers: { 'Content-type': 'application/json'}
                }
            );
        }
    }
}
