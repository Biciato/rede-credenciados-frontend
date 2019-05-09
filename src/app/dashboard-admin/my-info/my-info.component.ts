import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { ArquivoService } from '../../services/arquivo/arquivo.service';
import { AvatarService } from '../../services/avatar/avatar.service';
import { ModalService } from '../../services/modal/modal.service';
import { PessoaJuridicaService } from 'src/app/services/pessoa-juridica/pessoa-juridica.service';

import { PessoaFisica } from '../../models/pessoa-fisica';
import { PessoaJuridica } from '../../models/pessoa-juridica';

import { environment } from '../../../environments/environment';

import { interval } from 'rxjs';
import { map, retryWhen } from 'rxjs/operators';

@Component({
  selector: 'app-my-info',
  templateUrl: 'my-info.component.html',
  styleUrls: ['my-info.component.scss']
})

export class MyInfoComponent implements OnInit {

  arquivos: string[];
  arquivosSelected = [];
  avatarForm = new FormControl();
  baseUrlArquivos = environment.baseUrlArquivos;
  currentSlide: string;
  fileToShow: any;
  imageToShow = '../../../assets/images/sem-foto.jpg' ;
  loading = false;
  noImagem = '../../../assets/images/sem-foto.jpg';
  pessoaFisica: PessoaFisica;
  pessoaJuridica: PessoaJuridica;
  selectArquivo = false;
  slideHome: string[];
  user: any;

  constructor(
    private arqService: ArquivoService,
    private avatarService: AvatarService,
    private sanitizer: DomSanitizer,
    private modalService: ModalService,
    private pjService: PessoaJuridicaService,
    private router: Router
  ) {}

  ngOnInit() {
    // sets personType, token and id from local storage
    this.user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
    // setting the current slide image to init
    this.currentSlide = '../../../assets/images/sem-foto.jpg';
    this.avatarService.show(this.user.id).subscribe(
      (data) => data.length > 0 ? this.imageToShow = this.baseUrlArquivos + data : data,
      () => this.imageToShow = '../../../assets/images/sem-foto.jpg'
    );
    if (this.user.personType === 'pessoa_juridica') {
      this.loading = true;
      this.pjService.getPessoaJuridica(this.user.id, this.user.token)
        .subscribe(() => this.getIdxImgs(),
          () => {
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
            this.loading = false;
          }
        );
    }
  }

  // Add or remove file from server
  addOrRemove(event) {
    const nomeArquivo = event.target.name.replace('arquivos/' + this.user.id + '/imagens/', '');
    this.arquivosSelected.includes(nomeArquivo) ?
      this.arquivosSelected.splice(nomeArquivo, 1) :
      this.arquivosSelected.push(nomeArquivo);
  }

  // triggers input click after user selects an image from his files
  chooseAvatar() {
    document.getElementById('avatar').click();
  }

  // triggers input click after user selects a file from his files
  chooseArquivo() {
    document.getElementById('arquivo').click();
  }

  closeModal(id) {
    this.modalService.close(id);
  }

  deleteAvatar() {
    this.loading = true;
    this.avatarService.delete(this.user.id).subscribe(
      () => this.loading = false,
      () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      }
    );
    this.imageToShow = '../../../assets/images/sem-foto.jpg';
  }

  getIdxImgs() {
    this.slideHome = [];
    this.arquivos = [];
    this.arqService.indexImgs(this.user.id).subscribe(
      idx => {
        idx.forEach((element: string) => {
          this.slideHome.push(element);
          this.arquivos.push(element.replace('arquivos/' + this.user.id + '/imagens/',
            ''));
        });
        this.loading = false;
      },
      () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      },
      () => (this.setImgs())
    );
  }

  openModal(id) {
    this.modalService.open(id);
  }

  // remove file from server
  removeArquivo() {
    this.arquivosSelected.forEach(
      el => {
        this.loading = true;
        this.arqService.delete(this.user.id, el, this.user.token).subscribe(
            () => {
            this.loading = false;
            this.closeModal('modal-delete-arquivo');
            this.getIdxImgs();
            if ((this.arquivosSelected.length - 1) === this.arquivosSelected.indexOf(el)) {
              this.router.navigate([{ outlets: { update: ['update-message'] }}]);
            }
          },
          () => {
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
            this.loading = false;
          }
        );
      }
    );
  }

  setImgs() {
    this.loading = false;
    // Obsevable to rotate image carousel
    const source = interval(2000);
    // Handling Observable to reset when it finishes
    const mySubscribe = source.pipe(
      map(val => {

        if (val > (this.slideHome.length) - 1) {
            // error will be picked up by retryWhen
          throw val;
        }
        return val;
      }),
      retryWhen(errors => errors)
      );
    if (this.slideHome.length > 0) {
      // subscribing the Obsevable
      mySubscribe.subscribe(val => {
        this.currentSlide = this.baseUrlArquivos + this.slideHome[val];
      });
    }
  }

  showArquivo() {
    this.loading = true;
    this.arqService.show(this.user.id).subscribe(
      (arquivo) => {
        if (arquivo.length === 0) {
          this.modalService.open('modal-sem-arquivo');
          this.loading = false;
        } else {
          this.fileToShow = this.sanitizer
            .bypassSecurityTrustResourceUrl(`${this.baseUrlArquivos}${arquivo}`);
          this.modalService.open('modal-pdf');
          this.loading = false;
        }
      },
      () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      }
    );
  }

  // send img file to server
  uploadAvatar() {
    const avatar = document.getElementById('avatar') as HTMLInputElement;
    const formData = new FormData();
    formData.append('avatar', avatar.files[0]);
    if (avatar.files[0].size > 1009029) {
      this.openModal('modal-aviso-imagem');

      return;
    }
    if (avatar.files[0].type === 'image/jpeg') {
      this.loading = true;
      this.avatarService.update(formData, this.user.id, avatar.files[0].name)
        .subscribe(
          (path) => {
            this.loading = false;
            this.imageToShow = this.baseUrlArquivos + path;
          },
          () => {
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
            this.loading = false;
          }
        );
    } else {
      this.openModal('modal-aviso-imagem');
    }
  }

  // send pdf file to server
  uploadArquivo() {
    const arquivo = document.getElementById('arquivo') as HTMLInputElement;
    const formData = new FormData();
    formData.append('arquivo', arquivo.files[0]);
    if (arquivo.files[0].type === 'application/pdf' || arquivo.files[0].type === 'image/jpeg') {
      this.loading = true;
      this.arqService.store(formData, this.user.id, arquivo.files[0].name)
        .subscribe(
          () => {
            this.loading = false;
            this.router.navigate([{ outlets: { arquivo: ['arquivo-upload'] }}]);
            this.getIdxImgs();
          },
          () => {
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
            this.loading = false;
          }
        );
    } else {
      this.openModal('modal-aviso-arquivo');
    }
  }
}
