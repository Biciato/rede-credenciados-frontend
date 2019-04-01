import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FriendIndicationService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    sendEmail(dados) {
        return this.http.post(this.baseUrl + '/friend-indication', dados);
    }

    sendSMS(dados) {
        return this.http.post(this.baseUrl + '/friend-indication-sms', dados);
    }

}
