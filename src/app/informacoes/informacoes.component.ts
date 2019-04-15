import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { ArquivoService } from '../services/arquivo/arquivo.service';
import { ContatoEmailService } from '../services/contato-email/contato-email.service';
import { PessoaFisicaService } from '../services/pessoa-fisica/pessoa-fisica.service';
import { PessoaJuridicaService } from '../services/pessoa-juridica/pessoa-juridica.service';
import { GoogleGeolocatorService } from '../services/google-geolocator/google-geolocator.service';

import { environment } from '../../environments/environment';
import { ModalService } from '../services/modal/modal.service';
import { AvatarService } from '../services/avatar/avatar.service';
import { AddressService } from '../services/address/address.service';
import { ResumeService } from '../services/resume/resume.service';
import { ActivityService } from '../services/activity/activity.service';
import { PesquisaCliente } from '../models/pesquisa-cliente';

@Component({
    selector: 'app-informacoes',
    templateUrl: 'informacoes.component.html',
    styleUrls: ['informacoes.component.scss']
})

export class InformacoesComponent implements OnInit {
    @ViewChild('gmap') gmapElement: any;

    avatar: string;
    baseUrlArquivos = environment.baseUrlArquivos;
    // initiating contact form
    contatoForm = new FormGroup({
        nome: new FormControl(null, {
            validators: Validators.required
        }),
        email: new FormControl(null, {
            validators: [Validators.required, Validators.email],
            updateOn: 'blur'
        }),
        tel: new FormControl(null, {
            validators: [Validators.required, Validators.minLength(14)],
            updateOn: 'blur'
        }),
        cel: new FormControl(null, {
            validators: Validators.minLength(15),
            updateOn: 'blur'
        }),
        mensagem: new FormControl(null, {
            validators: Validators.required
        }),
    });
    dadosPesquisa: PesquisaCliente;
    empresaImgs = [];
    fileToShow: any;
    imageClicked: string;
    loading = false;
    map: google.maps.Map;
    resumo: any;
    user: any;

    constructor(
        private actService: ActivityService,
        private addrService: AddressService,
        private arqService: ArquivoService,
        private avatarService: AvatarService,
        private contEmail: ContatoEmailService,
        private googleService: GoogleGeolocatorService,
        private modalService: ModalService,
        private pfService: PessoaFisicaService,
        private pjService: PessoaJuridicaService,
        private resService: ResumeService,
        private route: ActivatedRoute,
        private router: Router,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit() {
        if (window.localStorage.user_rede_credenciados) {
            this.user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
            if (this.user.personType === 'pessoa_fisica') {
                this.loading = true;
                this.pfService.getPessoaFisica(this.user.id, this.user.token).subscribe(
                        (data) => {
                            this.dadosPesquisa = {
                                nome: data.nome,
                                tel: data.tel,
                                tel2: data.tel2,
                                email: data.email
                            };
                            this.getAddressResumeActivities(data.id);
                            this.loading = false;
                        },
                        () => {
                            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                            this.loading = false;
                        }
                    );
            } else {
                this.loading = true;
                this.pjService.getPessoaJuridica(this.user.id, this.user.token).subscribe(
                        (data) => {
                            this.dadosPesquisa = {
                                nome: data.nome_fantasia,
                                tel: data.tel,
                                tel2: data.tel2,
                                email: data.email
                            };
                            this.getAddressResumeActivities(data.id);
                            this.loading = false;
                        },
                        () => {
                            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                            this.loading = false;
                        }
                    );
            }
        } else {
            // sets dadosPesquisa Object from route parameters with unity data coming from section component
            this.dadosPesquisa = {
                nome: this.route.snapshot.queryParamMap.get('nome'),
                rua: this.route.snapshot.queryParamMap.get('rua'),
                numero: this.route.snapshot.queryParamMap.get('numero'),
                complemento: this.route.snapshot.queryParamMap.get('complemento'),
                tel: this.route.snapshot.queryParamMap.get('tel'),
                tel2: this.route.snapshot.queryParamMap.get('tel2'),
                cidade: this.route.snapshot.queryParamMap.get('cidade'),
                bairro: this.route.snapshot.queryParamMap.get('bairro'),
                atividades: this.route.snapshot.queryParamMap.get('atividades'),
                email: this.route.snapshot.queryParamMap.get('email'),
                id: this.route.snapshot.queryParamMap.get('id'),
                user_id: this.route.snapshot.queryParamMap.get('user_id'),
            };
            this.getGoogleMapData();
        }
        this.avatarService.show(this.route.snapshot.queryParamMap.get('user_id') ||
            this.user.id).subscribe(
                (data) => data.length > 0 ? this.avatar = this.baseUrlArquivos + data : data,
                () => this.avatar = '../../../assets/images/sem-foto.jpg'
            );

        this.arqService.indexImgs(this.route.snapshot.queryParamMap.get('user_id') ||
            this.user.id).subscribe(
                (idx) => idx.forEach(element => {
                    this.empresaImgs.push(this.baseUrlArquivos + element);
                }),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                }
            );
    }

    get nome() { return this.contatoForm.get('nome'); }
    get email() { return this.contatoForm.get('email'); }
    get tel() { return this.contatoForm.get('tel'); }
    get cel() { return this.contatoForm.get('cel'); }
    get mensagem() { return this.contatoForm.get('mensagem'); }

    closeModal(id) {
        this.modalService.close(id);
    }

    getAddressResumeActivities(id) {
        this.addrService.get(id, this.user.personType, this.user.token)
            .subscribe(
                endereco => {
                    this.dadosPesquisa.rua = endereco.rua;
                    this.dadosPesquisa.numero = endereco.numero.toString();
                    this.dadosPesquisa.complemento = endereco.complemento;
                    this.dadosPesquisa.bairro = endereco.bairro;
                    this.dadosPesquisa.cidade = endereco.cidade;
                    this.getGoogleMapData();
                    this.loading = false;
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
        this.resService.get(id, this.user.personType, this.user.token)
            .subscribe(
                resume => {
                    this.resumo = resume;
                    this.loading = false;
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
        this.actService.get(id, this.user.personType, this.user.token)
            .subscribe(
                data => {
                    this.dadosPesquisa.atividades = data.atividades;
                    this.loading = false;
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    getGoogleMapData() {
        this.googleService.getLatLng(
            this.dadosPesquisa.numero,
            this.dadosPesquisa.rua.trim(),
            this.dadosPesquisa.bairro,
            this.dadosPesquisa.cidade)
            .subscribe(
                dados => { this.setMap(dados); this.loading = false; },
                () => this.loading = false
            );
    }

    // tel field mask
    onKeyTel(event: any) {
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /(\d{0})(\d)/ , '$1($2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1) $2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{4})(\d)/ , '$1-$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    }

    // cel field mask
    onKeyCel(event: any) {
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /(\d{0})(\d)/ , '$1($2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1) $2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{5})(\d)/ , '$1-$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    }

    // send contact data to server api
    onContatoFormSubmit() {
        if (this.contatoForm.valid) {
            this.loading = true;
            this.contEmail.contatoEmail({
                email_to: this.dadosPesquisa.email,
                nome: this.contatoForm.value.nome,
                email: this.contatoForm.value.email,
                tel: this.contatoForm.value.tel,
                cel: this.contatoForm.value.cel,
                mensagem: this.contatoForm.value.mensagem,
            }).subscribe(
                    () => {
                        this.contatoForm.reset();
                        this.router.navigate([{ outlets: { message: ['solicitation-message'] }}]);
                        this.loading = false;
                    },
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
        } else {
            this.openModal('modal-validator');
        }
    }

    openModal(id) {
        this.modalService.open(id);
    }

    setMap(dados) {
        const mapProp = {
            center: new google.maps.LatLng(
                dados.results[0].geometry.location.lat,
                dados.results[0].geometry.location.lng
            ),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }

    showArquivo() {
        this.loading = true;
        this.arqService.show(this.dadosPesquisa.user_id).subscribe(
            (arquivo) => {
                if (arquivo.length === 0) {
                    this.openModal('modal-sem-arquivo');
                    this.loading = false;
                } else {
                    this.fileToShow = this.sanitizer
                        .bypassSecurityTrustResourceUrl(`${this.baseUrlArquivos}${arquivo}`);
                    this.openModal('modal-pdf');
                    this.loading = false;
                }
            },
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }

    zoom(img) {
        this.imageClicked = img;
        this.openModal('modal-zoom');
    }
}
