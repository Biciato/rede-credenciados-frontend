import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Atividade } from '../../models/atividade';
import { Atividades } from '../../models/atividades';

import { Subject } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ActivityService {
    private atividadeListSource = new Subject<String[]>();

    atividadeList$ = this.atividadeListSource.asObservable();

    baseUrl = environment.baseUrl;

    constructor(private http: HttpClient) { }

    register(pessoa) {
        if (pessoa.tipo_pessoa === 'pessoa_fisica') {
            return this.http.post<Atividades>(this.baseUrl + '/register-atividade-pf',
                {
                    id: pessoa.id,
                },
                { headers: {'Content-Type': 'application/json'}}
            );
        } else {
            return this.http.post<Atividades>(this.baseUrl + '/register-atividade-pj',
                {
                    id: pessoa.id,
                },
                { headers: {'Content-Type': 'application/json'}}
            );
        }
    }

    all() {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json'
        })};
        return this.http.get<Array<Atividade>>(this.baseUrl + '/atividades', httpOptions);
    }

    get(id, tipo_pessoa, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        if (tipo_pessoa === 'pessoa_fisica') {
            return this.http.get<Atividades>(this.baseUrl + `/atividade-pf/${id}`, httpOptions);
        } else {
            return this.http.get<Atividades>(this.baseUrl + `/atividade-pj/${id}`, httpOptions);
        }
    }

    getActivityNames(id) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json'
        })};
        return this.http.get<Atividade>(this.baseUrl + `/atividades/${id}`, httpOptions);
    }

    update(id, atividades, tipo_pessoa, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        if (tipo_pessoa === 'pessoa_fisica') {
            return this.http.put<Atividades>(this.baseUrl + `/atividade-pf/${id}`,
                {atividades: atividades}, httpOptions);
        } else {
            return this.http.put<Atividades>(this.baseUrl + `/atividade-pj/${id}`,
                {atividades: atividades}, httpOptions);
        }
    }

    newAtividade(atividade, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.post<Atividade>(this.baseUrl + '/atividade', {atividade: atividade}, httpOptions);
    }

    deleteAtividade(atividade, token) {
        const httpOptions = { headers: new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + token
        })};
        return this.http.delete<Atividade>(this.baseUrl + '/atividade/' + atividade.id, httpOptions);
    }

    passAtividadesToComponent(atividades) {
        this.atividadeListSource.next(atividades);
    }

}
