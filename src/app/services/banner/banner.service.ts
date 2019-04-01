import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

export interface Img {nome_imagem: string; }

@Injectable({providedIn: 'root'})
export class BannerService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    store(banner, id, filename, local, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Authorization': 'Bearer ' + token
        })};

        return this.http.post(this.baseUrl + `/banner/${id}/${local}/${filename}`, banner, httpOptions);
    }

    showTop(id) {
        return this.http.get<any>(this.baseUrl + `/banner/${id}/top`);
    }

    showSide(id) {
        return this.http.get<any>(this.baseUrl + `/banner/${id}/side`);
    }
}
