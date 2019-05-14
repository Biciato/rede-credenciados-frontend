import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class AvatarService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  update(avatar, user_id, filename) {
    return this.http.post(this.baseUrl + `/avatar/${user_id}/${filename}`, avatar);
  }

  updateUnidadeAvatar(avatar, user_id, unidade_id, filename) {
    return this.http.post(this.baseUrl + `/avatar-unidade/${user_id}/${unidade_id}/${filename}`, avatar);
  }

  show(id) {
    return this.http.get<any>(this.baseUrl + `/avatar/${id}`);
  }

  delete(id) {
    return this.http.delete(this.baseUrl + `/avatar/${id}`);
  }

  showUnidadeAvatar(id, unidade_id) {
    return this.http.get<any>(this.baseUrl + `/avatar-unidade/${id}/${unidade_id}`);
  }

  deleteUnidadeAvatar(id, unidade_id) {
    return this.http.delete(this.baseUrl + `/avatar-unidade/${id}/${unidade_id}`);
  }
}
