import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ContatoEmailService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    contatoEmail(dados) {
        return this.http.post(this.baseUrl + '/contato-email', dados);
    }
}
