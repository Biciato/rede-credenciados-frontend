import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class PagseguroService {
    baseUrl = 'https://ws.sandbox.pagseguro.uol.com.br/v2/checkout?';
    email = 'email=leandrobiciato@hotmail.com';
    token = '6E971925490647CB9584BE51B06963BE';
    constructor(private http: HttpClient) { }

    checkout(data) {
        const url = this.baseUrl + this.email + this.token;
        const httpOptions = { headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1'
        })};
        return this.http.post(url, data, httpOptions);
    }
}
