import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { PessoaFisicaService } from '../../services/pessoa-fisica/pessoa-fisica.service';
import { PessoaJuridicaService } from '../../services/pessoa-juridica/pessoa-juridica.service';
import { AddressService } from '../../services/address/address.service';
import { CotacaoService } from '../../services/cotacao/cotacao.service';
import { ModalService } from '../../services/modal/modal.service';

import { ABVR_ESTADO } from '../../models/abreviacao-estados';
import { Cotacao } from '../../models/cotacao';

@Component({
    selector: 'app-cotations',
    templateUrl: 'cotations.component.html',
    styleUrls: ['cotations.component.scss']
})

export class CotationsComponent implements OnInit {

    // checkbox track
    checked = false;
    // cotacao read checkbox tracked
    cotacaoLidaChecked = false;
    // init cotations form
    cotationsForm = new FormGroup({
        date: new FormControl(''),
        solicited: new FormControl(''),
        solicitation: new FormControl(''),
        description: new FormControl(''),
    });
    // array to save cotacoes
    cotacoes: Cotacao[];
    // array to save cotacao lida record
    cotacaoLida: any;
    // array to keep cotacao lida records
    cotacoesLida = [];
    cotacoesLidaStatusFalse = [];
    // property to keep track of cotacao that was selected
    cotacaoSelected: Cotacao;
    // array of cotacoes selecteds
    cotacoesSelected: Cotacao[];
    // property to get cotacoes of the endereco
    endereco: any;
    loading = false;
    // collections of pages of pagination
    pages: number[];
    // page clicked track
    p = 1;
    pagClicked = 1;
    // keep track of select all function
    selectAllFlag = false;
    user: any;

    constructor(private cotService: CotacaoService,
                private endService: AddressService,
                private modalService: ModalService,
                private pfService: PessoaFisicaService,
                private pjService: PessoaJuridicaService,
                private route: ActivatedRoute,
                private router: Router) { }

    ngOnInit() {
        this.loading = true;
        // setting token, personType and user's id via query parameters
        this.user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
        // getting user data
        if (this.user.personType === 'pessoa_fisica') {
            this.pfService.getPessoaFisica(this.user.id, this.user.token)
                .subscribe(pf => this.getEndPF(pf), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
        } else {
            this.pjService.getPessoaJuridica(this.user.id, this.user.token)
                .subscribe(pj => this.getEndPJ(pj), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
        }
        this.cotacoes = [];
    }

    // check which cotation read matching with cotation read table
    checkCotsRead(cotacoesLida) {
        this.loading = false;
        this.cotacoesLida = cotacoesLida;
        this.cotacoesLidaStatusFalse = [];
        for (const el of this.cotacoes) {
            for (const el2 of this.cotacoesLida) {
                if (el.id === el2.cotacao_id && (el2.cotacaoLida === 1 || el2.cotacaoLida === '1')) {
                    el.cotacaoLida = true;
                }
                if (el.id === el2.cotacao_id && (el2.cotacaoLida === 0 || el2.cotacaoLida === '0')) {
                    el.cotacaoLida = false;
                    this.cotacoesLidaStatusFalse.push(el2.id);
                }
            }
        }
    }

    // getting pessoa fisica cotations addresses
    getEndPF(pf) {
        this.endService.get(pf.id, this.user.personType, this.user.token).subscribe(
            endereco => this.getCotacoes(endereco),
            () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
        );
    }

    // getting pessoa juridica cotations addresses
    getEndPJ(pj) {
        this.endService.get(pj.id, this.user.personType, this.user.token)
            .subscribe(endereco => this.getCotacoes(endereco),
                () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
            );
    }

    // getting user's cotations
    getCotacoes(endereco) {
        this.endereco = endereco;
        this.cotService.getCotacoes(
            {
                estado: ABVR_ESTADO[endereco.estado],
                cidade: endereco.cidade
            }, this.user.token)
            .subscribe(cotacoes => this.setCotsAndPages(cotacoes), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
    }

    // getting user's cotations that was read
    getCotacoesRead() {
        this.cotService.getCotRead(this.user.id, this.user.token)
            .subscribe(cotacoesLida => this.checkCotsRead(cotacoesLida), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
    }

    // open selected cotation in a modal
    openCotacao(i) {
        this.cotacaoSelected = this.cotacoes[i];
        this.modalService.open('custom-modal-6');
    }

    // setting cotations on table and pages on pagination
    setCotsAndPages(cotacoes) {
        this.cotacoesSelected = [];
        this.pages = [];
        this.cotacoes = cotacoes;
        const num = this.cotacoes.length / 10;
        if (Math.ceil(num) <= 1) {
            this.pages.push(1);
        } else {
            for (let i = 1; i <= Math.ceil(num); i++) {
                this.pages.push(i);
            }
        }
        this.getCotacoesRead();
    }

    // set a single cotation as read
    setAsRead(id) {
        this.loading = true;
        this.cotService.setCotAsRead(
            {
                userId: this.user.id,
                cotacao_id: this.cotacaoSelected.id
            }, this.user.token)
            .subscribe(() => this.resetMsgs(id), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
    }

    // set collections of cotations as read
    setAsReadCol() {
        this.loading = true;
        const cotacaoIds = [];
        this.cotacoesSelected.forEach(item => cotacaoIds.push(item.id));
        this.cotService.setCotAsReadCol(
            {
                userId: this.user.id,
                cotacaoIds
            }, this.user.token)
            .subscribe(() => this.resetMsgs(), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
    }

    // set collections of cotations as unread
    setAsUnreadCol() {
        this.loading = true;
        const cotacaoIds = [];
        this.cotacoesSelected.forEach(item => cotacaoIds.push(item.id));
        this.cotService.setCotAsUnreadCol(
            {
                userId: this.user.id,
                cotacaoIds
            }, this.user.token)
            .subscribe(() => this.resetMsgs(), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
    }

    // select all checkboxes
    selectAll() {
        const els = document.getElementsByName('cotacao_checkbox');
        if (this.selectAllFlag === false) {
            [].forEach.call(els, (el) => el.checked = true);
            this.cotacoesSelected = [];
            this.cotacoes.forEach(item => this.cotacoesSelected.push(item));
        } else {
            [].forEach.call(els, (el) => el.checked = false );
            this.cotacoesSelected = [];
        }
        this.selectAllFlag = !this.selectAllFlag;
    }

    // resets cotacoes after user marking as read or Unread
    resetMsgs(id?) {
        this.loading = false;
        this.getCotacoes(this.endereco);
        this.cotacoesSelected = [];
        this.selectAllFlag = false;
        if (id) {this.modalService.close(id); }
    }

    closeModal(id) {
        this.modalService.close(id);
    }

    // Control selected checkboxes
    checkBoxesSelected(cotacao) {
        const idx = this.cotacoesSelected.indexOf(cotacao);
        this.cotacoesSelected.includes(cotacao) ? this.cotacoesSelected.splice(idx, 1) :
            this.cotacoesSelected.push(cotacao);
    }
}
