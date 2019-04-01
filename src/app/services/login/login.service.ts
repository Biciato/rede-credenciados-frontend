import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user';

import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class LoginService {
    @Output() dsMode: EventEmitter<boolean> = new EventEmitter();

    baseUrl = environment.baseUrl;

    private userEmailAndIdSrc = new Subject<any>();

    constructor(private http: HttpClient) { }

    login(user: User) {
        return this.http.post<User>(this.baseUrl + '/login', user);
    }

    resetPassword(id, password, token) {
      console.log(token);
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': 'Bearer ' + token
            })
        };
        return this.http.put(this.baseUrl + '/user-reset-password/' + id, password, httpOptions);
    }

    dashEnter() {
        this.dsMode.emit(true);
    }

    sendEmail(id, email) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        };
        return this.http.post(this.baseUrl + '/forget-password-email',
            {
                id: id,
                email: email
            }
        , httpOptions);
    }

    resetPasswordViaForgetPassword(id, email, password) {
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
            })
        };
        return this.http.post(this.baseUrl + '/reset-password/' + id,
        {
            email: email,
            password: password
        }, httpOptions);
    }

    passUserEmailAndId(email, id) {
        console.log(email, id);
        this.userEmailAndIdSrc.next({email: email, id: id});
    }

    getUserEmailAndId() {
        return this.userEmailAndIdSrc.asObservable();
    }
}
