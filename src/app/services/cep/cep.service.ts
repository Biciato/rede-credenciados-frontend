import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class CEPService {
    constructor(private httpClient: HttpClient) { }

    getAddress(cep) {
        return this.httpClient.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
    }
}
