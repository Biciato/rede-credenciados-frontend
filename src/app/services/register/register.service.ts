import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user';

import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({providedIn: 'root'})
export class RegisterService {

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    registerUser(user: User) {
        return this.http.post<User>(this.baseUrl + '/register', user, httpOptions);
    }

    registerUserPropaganda(user) {
        return this.http.post(this.baseUrl + 'user-propaganda-register', user);
    }

    verifyEmail(user) {
        return this.http.post(this.baseUrl + '/verify-email', user, httpOptions);
    }

    emailValidation(email) {
        return this.http.post(this.baseUrl + '/email-validation', email);
    }

    confirmEmail(id) {

        const date = new Date().toISOString().substr(0, 19).replace('T', ' ');

        return this.http.post(this.baseUrl + '/confirm-email/' + id, {date}, httpOptions);
    }

    checkUserEmail(email) {
        return this.http.get<any>(this.baseUrl + '/check-email/' + email, httpOptions);
    }

    checkCpf(cpf) {
        return this.http.post<any>(this.baseUrl + '/check-cpf', {cpf}, httpOptions);
    }

    checkCnpj(cnpj) {
        return this.http.post(this.baseUrl + '/check-cnpj', {cnpj}, httpOptions);
    }
}
