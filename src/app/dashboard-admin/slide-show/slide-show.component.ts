import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { ArquivoService } from '../../services/arquivo/arquivo.service';

import { SlideImagem } from '../../models/slide-imagem';

import { environment } from '../../../environments/environment';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-slide-show',
    templateUrl: 'slide-show.component.html',
    styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {
    baseUrl = environment.baseUrlArquivos;
    loading = false;
    newImgFlag: boolean;
    ordem = new FormControl(null, {
        validators: Validators.required
    });
    slideImagem: SlideImagem;
    slideImagens: SlideImagem[];
    token: string;

    constructor(private arqService: ArquivoService,
                private modalService: ModalService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        // getting token from localStorage and pj and activities from server
        this.token = JSON.parse(window.localStorage.getItem('user_rede_credenciados')).token;
        this.getSlideImgs();
    }

    getSlideImgs() {
        this.arqService.slideImgIdx().subscribe(imgs => this.setSlideImgs(imgs), () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            });
    }

    setSlideImgs(imgs) {
        this.loading = false;
        this.slideImagens = [];
        this.newImgFlag = false;
        imgs.forEach(el => {
            this.slideImagens.push({
                nome: el.replace('slide-imagens/', '').replace('.jpg', '').substring(1),
                srcDesktop: this.baseUrl + el,
                srcMobile: this.baseUrl + el,
                ordem: Number(el.replace('slide-imagens/', '').slice(0, 1))
            } as SlideImagem);
        });
    }

    newImg() {
        this.loading = true;
        const newSlideImg = document.getElementById('newSlideImg') as HTMLInputElement;
        const formData = new FormData();
        formData.append('slide-imagem', newSlideImg.files[0]);
        this.arqService.storeSlideImg(formData, newSlideImg.files[0].name, this.ordem.value, this.token)
            .subscribe(
                () => { this.getSlideImgs(); this.modalService.close('modal-slide-image'); },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    deleteSlideImg(slideImagem) {
        this.arqService.deleteSlideImg(slideImagem.ordem + slideImagem.nome + '.jpg', this.token)
            .subscribe(
                () => this.getSlideImgs(),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    openModal() {
        this.modalService.open('modal-slide-image');
    }

    closeModal() {
        this.modalService.close('modal-slide-image');
    }
}
