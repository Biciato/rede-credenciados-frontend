import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

    constructor(private httpClient: HttpClient) { }

    getCities(id) {
        const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`;

        return this.httpClient.get<Array<any>>(url);
    }
}
