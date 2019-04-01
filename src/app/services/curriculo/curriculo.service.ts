import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class CurriculoService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    store(curriculo, directory, filename) {
        return this.http.post(`${this.baseUrl}/store-curriculo/${directory}/${filename}`, curriculo);
    }

    create(curriculo) {
        return this.http.post<any>(this.baseUrl + '/curriculo', curriculo);
    }
}
