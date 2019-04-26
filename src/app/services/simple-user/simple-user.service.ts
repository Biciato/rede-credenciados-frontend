import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class SimpleUserService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    show(id) {
        return this.http.get(this.baseUrl + '/user-propaganda/' + id);
    }

    index() {
        return this.http.get(this.baseUrl + '/user-propagandas');
    }
}
