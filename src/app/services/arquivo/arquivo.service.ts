import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

export interface Img {nome_imagem: string; }

@Injectable({providedIn: 'root'})
export class ArquivoService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  store(arquivo, userId, filename) {
    return this.http.post(this.baseUrl + `/arquivos/${userId}/${filename}`, arquivo);
  }

  storeUnityImg(arquivo, id, filename) {
    return this.http.post(this.baseUrl + `/arquivos-unidade/${id}/${filename}`, arquivo);
  }

  storeSlideImg(slideImg, filename, ordem, token) {
    const httpOptions = { headers: new HttpHeaders({
      Authorization: 'Bearer ' + token
    })};
    return this.http.post(this.baseUrl + '/slide-imagem/' + filename + '/' + ordem, slideImg, httpOptions);
  }

  indexImgs(id) {
    return this.http.get<string[]>(this.baseUrl + `/arquivos-imagens-index/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  indexUnityImgs(id) {
    return this.http.get<string[]>(this.baseUrl + `/imagens-unidade-index/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    });
  }

  slideImgIdx() {
    return this.http.get<Array<Img>>(this.baseUrl + `/slide-imagens`, {
      headers: new HttpHeaders({
        'Content-type': 'application/pdf'
      })
    });
  }

  show(id) {
    return this.http.get<any>(this.baseUrl + `/arquivos/${id}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      }),
    });
  }

  delete(id, arquivo, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/pdf',
      Authorization: 'Bearer ' + token
    })};
    return this.http.delete(this.baseUrl + `/arquivos/${id}/${arquivo}`, httpOptions);
  }

  deleteUnityImg(id, arquivo, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/pdf',
      Authorization: 'Bearer ' + token
    })};
    return this.http.delete(this.baseUrl + `/arquivos-unidade/${id}/${arquivo}`, httpOptions);
  }

  deleteSlideImg(slideImagem, token) {
    const httpOptions = { headers: new HttpHeaders({
      'Content-type': 'application/pdf',
      Authorization: 'Bearer ' + token
    })};
    return this.http.delete(this.baseUrl + `/slide-imagem/${slideImagem}`, httpOptions);
  }
}
