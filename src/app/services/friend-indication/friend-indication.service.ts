import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class FriendIndicationService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  create(indication) {
    return this.http.post(this.baseUrl + '/friend-indication', indication);
  }

  update(id, date) {
    return this.http.put(this.baseUrl + '/friend-indication/' + id, {date});
  }

  index() {
    return this.http.get(this.baseUrl + '/friend-indications');
  }

  sendEmail(dados) {
    return this.http.post(this.baseUrl + '/friend-indication-email', dados);
  }

  sendSMS(dados) {
    return this.http.post(this.baseUrl + '/friend-indication-sms', dados);
  }

}
