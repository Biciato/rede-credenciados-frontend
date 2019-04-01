import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Newsletter } from '../../models/newsletter';

import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class NewsletterService {
    baseUrl = environment.baseUrl;
    httpOptions = { headers: new HttpHeaders({
        'Content-type': 'application/json'
    })};

    constructor(private http: HttpClient) { }

    create(dados) {
        return this.http.post(this.baseUrl + '/newsletter', dados, this.httpOptions);
    }

    index(token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.get<Newsletter[]>(this.baseUrl + '/newsletters', httpOptions);
    }

    delete(id, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.delete(this.baseUrl + '/newsletter/' + id, httpOptions);
    }
}
