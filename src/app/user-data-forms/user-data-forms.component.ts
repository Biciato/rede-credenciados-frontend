import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AtividadesComponent } from '../atividades/atividades.component';

import { ActivityService } from '../services/activity/activity.service';
import { AddressService } from '../services/address/address.service';
import { CEPService } from '../services/cep/cep.service';
import { ModalService } from '../services/modal/modal.service';
import { PessoaFisicaService } from '../services/pessoa-fisica/pessoa-fisica.service';
import { PessoaJuridicaService } from '../services/pessoa-juridica/pessoa-juridica.service';
import { ResumeService } from '../services/resume/resume.service';

import { Atividade } from '../models/atividade';
import { Endereco } from '../models/endereco';
import { PessoaFisica } from '../models/pessoa-fisica';
import { PessoaJuridica } from '../models/pessoa-juridica';
import { RegisterService } from '../services/register/register.service';
import { UnityService } from '../services/unity/unity.service';

import { ABVR_ESTADO_INVERSO } from '../models/abreviacao-estados';

import { stateValidator } from '../validators/state.validator';
import { rgValidator } from '../validators/rg.validator';
import { LoginService } from '../services/login/login.service';

@Component({
    selector: 'app-user-data-forms',
    templateUrl: 'user-data-forms.component.html',
    styleUrls: ['user-data-forms.component.scss']
})

export class UserDataFormsComponent implements OnInit {
    @ViewChild(AtividadesComponent)
    private ativComp: AtividadesComponent;
    // Initiating Pf form group
    pessoaFisicaForm = new FormGroup({
    cpf: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
        Validators.minLength(14)], updateOn: 'blur' }),
    rg: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
        rgValidator()], updateOn: 'blur' }),
    nascimento: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
        Validators.minLength(10)], updateOn: 'blur' }),
    idade: new FormControl({ value: '', disable: true}),
    sexo: new FormControl({ value: '', disabled: true}, Validators.required),
    nome: new FormControl({ value: '', disabled: true}, Validators.required),
    email: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
        Validators.email], updateOn: 'blur' }),
    email2: new FormControl({ value: '', disabled: true}, { validators: Validators.email,
        updateOn: 'blur' }),
    tel: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
        Validators.minLength(14)], updateOn: 'blur' }),
    tel2: new FormControl({ value: '', disabled: true}, { validators: Validators.minLength(14),
        updateOn: 'blur' }),
    cel: new FormControl({ value: '', disabled: true}, { validators: Validators.minLength(15),
        updateOn: 'blur' }),
    cel2: new FormControl({ value: '', disabled: true}, { validators: Validators.minLength(15),
        updateOn: 'blur' }),
    });

    // Initiating Pj form group
    pessoaJuridicaForm = new FormGroup({
        razao_social: new FormControl({ value: '', disabled: true}, Validators.required),
        nome_fantasia: new FormControl({ value: '', disabled: true}, Validators.required),
    cnpj: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
        Validators.minLength(18)], updateOn: 'blur' }),
    nome_contato: new FormControl({ value: '', disabled: true}, Validators.required),
    email: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
        Validators.email], updateOn: 'blur' }),
    email2: new FormControl({ value: '', disabled: true}, { validators: Validators.email, updateOn: 'blur' }),
    tel: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
        Validators.minLength(14)], updateOn: 'blur' }),
    tel2: new FormControl({ value: '', disabled: true}, { validators: Validators.minLength(14),
        updateOn: 'blur' }),
    cel: new FormControl({ value: '', disabled: true}, { validators: Validators.minLength(15),
        updateOn: 'blur' }),
    cel2: new FormControl({ value: '', disabled: true}, { validators: Validators.minLength(15),
        updateOn: 'blur' }),
    });

    // Initiating address form group
    addressForm = new FormGroup({
        cep: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
            Validators.minLength(9)], updateOn: 'blur' }),
        rua: new FormControl({ value: '', disabled: true}, Validators.required),
        numero: new FormControl({ value: '', disabled: true}, Validators.required),
        complemento: new FormControl({ value: '', disabled: true}),
        bairro: new FormControl({ value: '', disabled: true}, Validators.required),
        cidade: new FormControl({ value: '', disabled: true}, Validators.required),
        estado: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
            stateValidator()], updateOn: 'blur' } ),
    });

    // Initiating login form group
    loginForm = new FormGroup({
        login: new FormControl({ value: '', disabled: true}, { validators: [Validators.required,
            Validators.email], updateOn: 'blur' }),
        password: new FormControl({ value: '', disabled: true}, { validators:
            [Validators.required, Validators.minLength(6)]}),
    });

    brStates = [
        'Rio de Janeiro',
        'Rondonia',
        'Acre',
        'Amazonas',
        'Roraima',
        'Para',
        'Tocantins',
        'Amapa',
        'Maranhao',
        'Piaui',
        'Ceara',
        'Rio Grande do Norte',
        'Paraiba',
        'Pernambuco',
        'Alagoas',
        'Sergipe',
        'Bahia',
        'Minas Gerais',
        'Espirito Santo',
        'Sao Paulo',
        'Parana',
        'Santa Catarina',
        'Rio Grande do Sul',
        'Mato Grosso do Sul',
        'Goias',
        'Mato Grosso',
        'Distrito Federal'
    ].sort();

    count: number;

    cpfCnpj: string;

    editAddressBtn = true;
    editPfButton = false;
    editPjButton = false;
    editResumeBtn = true;
    editServicesBtn = true;

    endereco: Endereco;

    jobClicked = 'Selecione suas especialidades:';
    jobListShow = false;
    jobsFull = [];
    jobTags: Array<Atividade>;

    isAdmin: boolean;

    loading = false;

    passwordTypeInput = 'password';
    pessoaFisica: PessoaFisica;
    pessoaJuridica: PessoaJuridica;

    // Initiating Resume form group
    resumeForm = new FormControl({ value: 'Não Possui', disabled: true }, Validators.required);
    resumeFlag = false;

    saveAddressBtn = false;
    savePfButton = false;
    savePjButton = false;
    saveResumeBtn = false;
    saveServicesBtn = false;
    showStates = false;
    stateSelected: string;

    user: any;

    constructor(
        private actService: ActivityService,
        private addrService: AddressService,
        private cepService: CEPService,
        private loginService: LoginService,
        private modalService: ModalService,
        private pfService: PessoaFisicaService,
        private pjService: PessoaJuridicaService,
        private resService: ResumeService,
        private registerService: RegisterService,
        private router: Router,
        private unityService: UnityService
    ) { }

    ngOnInit() {
        // sets person type, user id and token from local Storage
        this.user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
        if (window.location.href.includes('dashboard-admin')) {
            this.isAdmin = true;
            this.loginService.getUser(this.user.id, this.user.token)
                .subscribe((user) => this.setValuesOnLoginForm(user), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
        }

        // gets pf or pj acordingly to person type prop
        if (this.user.personType === 'pessoa_fisica') {
            this.loading = true;
            this.editPfButton = true;
            this.pfService.getPessoaFisica(this.user.id, this.user.token)
                .subscribe(pf => this.setValuesOnPfForm(pf), () => this.loading = false);
        } else {
            this.loading = true;
            this.editPjButton = true;
            this.pjService.getPessoaJuridica(this.user.id, this.user.token)
                .subscribe(pj => this.setValuesOnPjForm(pj), () => this.loading = false);
        }
        this.actService.all()
            .subscribe(
                activityList => activityList.map(atividade => this.jobsFull.push(atividade)),
                () => this.loading = false,
                () => this.loading = false
            );

    }

    get razao_social() { return this.pessoaJuridicaForm.get('razao_social'); }
    get nome_fantasia() { return this.pessoaJuridicaForm.get('nome_fantasia'); }
    get nome_contato() { return this.pessoaJuridicaForm.get('nome_contato'); }
    get cnpj() { return this.pessoaJuridicaForm.get('cnpj'); }
    get tel() { return this.pessoaJuridicaForm.get('tel'); }
    get tel2() { return this.pessoaJuridicaForm.get('tel2'); }
    get email() { return this.pessoaJuridicaForm.get('email'); }
    get email2() { return this.pessoaJuridicaForm.get('email2'); }
    get cel() { return this.pessoaJuridicaForm.get('cel'); }
    get cel2() { return this.pessoaJuridicaForm.get('cel2'); }

    get nome() { return this.pessoaFisicaForm.get('nome'); }
    get cpf() { return this.pessoaFisicaForm.get('cpf'); }
    get rg() { return this.pessoaFisicaForm.get('rg'); }
    get nascimento() { return this.pessoaFisicaForm.get('nascimento'); }
    get idade() { return this.pessoaFisicaForm.get('idade'); }
    get sexo() { return this.pessoaFisicaForm.get('sexo'); }
    get telPf() { return this.pessoaFisicaForm.get('tel'); }
    get tel2Pf() { return this.pessoaFisicaForm.get('tel2'); }
    get emailPf() { return this.pessoaFisicaForm.get('email'); }
    get email2Pf() { return this.pessoaFisicaForm.get('email2'); }
    get celPf() { return this.pessoaFisicaForm.get('cel'); }
    get cel2Pf() { return this.pessoaFisicaForm.get('cel2'); }

    get cep() { return this.addressForm.get('cep'); }
    get rua() { return this.addressForm.get('rua'); }
    get complemento() { return this.addressForm.get('complemento'); }
    get bairro() { return this.addressForm.get('bairro'); }
    get numero() { return this.addressForm.get('numero'); }
    get cidade() { return this.addressForm.get('cidade'); }
    get estado() { return this.addressForm.get('estado'); }

    get resume() { return this.resumeForm.get('resume'); }

    get login() { return this.loginForm.get('login'); }
    get password() { return this.loginForm.get('password'); }

    // calculates age through date data from api server
    calcIdade(data) {
        if (data) {
            const d = new Date();
            const anoAtual = d.getFullYear();
            const mesAtual = d.getMonth() + 1;
            const diaAtual = d.getDate();
            const split = data.split('/');
            const novadata = split[1] + '/' + split[0] + '/' + split[2];
            const dataAmericana = new Date(novadata);
            const vAno = dataAmericana.getFullYear();
            const vMes = dataAmericana.getMonth() + 1;
            const vDia = dataAmericana.getDate();
            const anoAniversario = +vAno;
            const mesAniversario = +vMes;
            const diaAniversario = +vDia;
            let quantosAnos = anoAtual - anoAniversario;
            if (mesAtual < mesAniversario || mesAtual === mesAniversario && diaAtual < diaAniversario) {
                quantosAnos--;
            }
            return quantosAnos < 0 ? 0 : quantosAnos;
        }
    }

    changePasswordInputType(type) {
        this.passwordTypeInput = type;
    }

    checkEmail() {
        this.loading = true;
        let email: string;
        if (this.isAdmin === true) {
            email = this.loginForm.value.login;
        } else if (this.user.personType === 'pessoa_fisica') {
            email = this.pessoaFisicaForm.value.email;
        } else if (this.user.personType === 'pessoa_juridica'){
            email = this.pessoaJuridicaForm.value.email;
        }
        this.registerService.checkUserEmail(email)
            .subscribe(
                (data) => {
                    (Object.entries(data).length === 0) &&
                    (data.constructor === Object) ||
                    (data && data.email === email) ? this.emailValidation(email) :
                        this.openModal('modal-invalid-email');
                    this.loading = false;
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    closeModal(id) {
        this.modalService.close(id);
    }

    disableLoginForm() {
        this.loginForm.disable();
    }

    disablePfForm() {
        this.pessoaFisicaForm.disable();
    }

    disablePjForm() {
        this.pessoaJuridicaForm.disable();
    }

    disableAddressForm() {
        this.loading = false;
        this.router.navigate([{ outlets: { update: ['update-message'] }}]);
        this.saveAddressBtn = false;
        this.editAddressBtn = true;
        this.addressForm.disable();
    }

    disableResumeForm() {
        this.loading = false;
        this.router.navigate([{ outlets: { update: ['update-message'] }}]);
        this.saveResumeBtn = false;
        this.editResumeBtn = true;
        this.resumeForm.disable();
    }

    disableAtividadesForm() {
        this.loading = false;
        this.router.navigate([{ outlets: { update: ['update-message'] }}]);
        this.saveServicesBtn = false;
        this.editServicesBtn = true;
    }

    // collections of functions that handles edit and save buttons

    editAddressForm() {
        this.addressForm.enable();
        this.loginForm.enable();
        this.saveAddressBtn = true;
        this.editAddressBtn = false;
        if (this.user.personType === 'pessoa_fisica') {
            this.pessoaFisicaForm.enable();
            this.pessoaFisicaForm.controls.idade.disable();
            this.savePfButton = true;
            this.editPfButton = false;
        } else {
            this.pessoaJuridicaForm.enable();
            this.savePjButton = true;
            this.editPjButton = false;
        }
    }

    editServicesForm() {
        this.modalService.open('modal-atividades');
        this.actService.passAtividadesToComponent(this.jobTags);
        this.saveServicesBtn = true;
        this.editServicesBtn = false;
    }

    editResumeForm() {
        this.resumeForm.enable();
        this.saveResumeBtn = true;
        this.editResumeBtn = false;
    }

    // end collections of functions that handles edit and save buttons

    emailValidation(email) {
        this.loading = true;
        this.registerService.emailValidation({email})
            .subscribe(
                (data) => {
                    data === true ? this.onAddressSubmit() : this.openModal('modal-email-validation');
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    // sends address data to api server
    onAddressSubmit() {
        if (this.addressForm.valid &&
            (this.pessoaFisicaForm.valid || this.pessoaJuridicaForm.valid)) {
            this.loading = true;
            if (this.addressForm.value.estado.length > 2) {
                this.stateSelected = ABVR_ESTADO_INVERSO[this.addressForm.value.estado];
            } else {
                this.stateSelected = this.addressForm.value.estado;
            }
            if (this.isAdmin === true && this.loginForm.invalid) {
                this.openModal('modal-validator');
                this.loading = false;
                return;
            }
            const endereco = {
                cep: this.addressForm.value.cep,
                rua: this.addressForm.value.rua,
                numero: this.addressForm.value.numero,
                complemento: this.addressForm.value.complemento,
                bairro: this.addressForm.value.bairro,
                cidade: this.addressForm.value.cidade,
                estado: this.stateSelected
            };
            this.loginService.updateUser(this.loginForm.value, this.user.id, this.user.token)
                .subscribe(() => this.disableAddressForm(), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
            if (this.pessoaJuridica) {
                this.addrService.update(this.pessoaJuridica.id, endereco,
                    this.user.personType, this.user.token)
                    .subscribe(() => this.disableAddressForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
                this.pjService.update(this.pessoaJuridica.id, this.pessoaJuridicaForm.value,
                    this.user.token)
                    .subscribe(() => this.disablePjForm(), () => {
                            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                            this.loading = false;
                        });
            } else {
                this.addrService.update(this.pessoaFisica.id, endereco, this.user.personType,
                    this.user.token)
                    .subscribe(() => this.disableAddressForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
                this.pfService.update(this.pessoaFisica.id, this.pessoaFisicaForm.value,
                    this.user.token)
                    .subscribe(() => this.disablePfForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
            }
        } else {
            this.openModal('modal-validator');
        }
    }

    // sends resume data to api server
    onResumeSubmit() {
        if (this.resumeForm.valid) {
            this.loading = true;
            if (this.pessoaFisica) {
                this.resService.update(this.pessoaFisica.id, this.resumeForm.value,
                    this.user.personType, this.user.token)
                    .subscribe(() => this.disableResumeForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
            } else {
                this.resService.update(this.pessoaJuridica.id, this.resumeForm.value,
                    this.user.personType, this.user.token)
                    .subscribe(() => this.disableResumeForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
            }
        } else {
            this.openModal('modal-validator');
        }
    }

    // sends activities data to api server
    onAtividadesSubmit() {
        if (this.ativComp.atividadesSelected.length > 0) {
            this.loading = true;
            if (this.user.personType === 'pessoa_fisica') {
                this.actService.update(this.pessoaFisica.id, this.ativComp.atividadesSelected.toString(),
                    this.user.personType, this.user.token)
                    .subscribe(() => this.disableAtividadesForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
            } else if (this.user.personType === 'pessoa_juridica') {
                this.actService.update(this.pessoaJuridica.id, this.ativComp.atividadesSelected.toString(),
                    this.user.personType, this.user.token)
                    .subscribe(() => this.disableAtividadesForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
            }
        } else {
            this.modalService.open('modal-empty-activities');
            this.actService.passAtividadesToComponent(this.jobTags);
            this.saveServicesBtn = false;
            this.editServicesBtn = true;
        }
    }

    // cnpj field mask
    onKeyCNPJ(event: any) { // without type info
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /^(\d{2})(\d)/ , '$1.$2'); // Coloca ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value
            .replace( /^(\d{2})\.(\d{3})(\d)/ , '$1.$2.$3'); // Coloca ponto entre o quinto e o sexto dígitos
        event.target.value = event.target.value
            .replace( /\.(\d{3})(\d)/ , '.$1/$2'); // Coloca uma barra entre o oitavo e o nono dígitos
        event.target.value = event.target.value.replace( /(\d{4})(\d)/ , '$1-$2'); // Coloca um hífen depois do bloco de quatro dígitos
        if (event.target.value.length === 18) {
            if (event.target.value === this.pessoaJuridica.cnpj) {
                return;
            }
            this.loading = true;
            this.registerService.checkCnpj(event.target.value).subscribe(
                (data) => Object.entries(data).length === 0
                    && data.constructor === Object ? this.loading = false : this.onCpfCnpjInvalid('CNPJ'),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
            this.unityService.checkCnpj(event.target.value).subscribe(
                (data) => Object.entries(data).length === 0
                    && data.constructor === Object ? this.loading = false : this.onCpfCnpjInvalid('CNPJ'),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
        }
    }


    // cpf field mask
    onKeyCPF(event: any) {
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /(\d{3})(\d)/ , '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        event.target.value = event.target.value.replace( /(\d{3})(\d)/ , '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
            // de novo (para o segundo bloco de números)
        event.target.value = event.target.value
            .replace( /(\d{3})(\d{1,2})$/ , '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
        if (event.target.value.length === 14) {
            if (event.target.value === this.pessoaFisica.cpf) {
                return;
            } else {
                this.loading = true;
                this.registerService.checkCpf(event.target.value).subscribe(
                    (data) => Object.entries(data).length === 0
                        && data.constructor === Object ? this.loading = false : this.onCpfCnpjInvalid('CPF'),
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
            }
        }
    }

    // rg field mask
    onKeyRG(event: any) {
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1.$2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{3})(\d)/ , '$1.$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
            // de novo (para o segundo bloco de números)
        event.target.value = event.target.value
            .replace( /(\d{3})(\d{1,2})$/ , '$1-$2'); // Coloca um hífen entre o terceiro e o quarto dígitos
    }

    // date field mask
    onKeyDate(event: any) {
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1/$2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1/$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
        if (event.target.value.length === 10) {
           const el = document.getElementById('idade') as HTMLInputElement;
           el.value = this.calcIdade(event.target.value).toString();
        }
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

    // cep field mask
    onKeyCep(event: any) {
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /(\d{5})(\d)/ , '$1-$2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        // sets address values based on Via CEP service
        if (event.target.value.length === 9) {
            this.loading = true;
            this.cepService.getAddress(event.target.value)
                .subscribe(
                    data => {
                        this.setValuesOnAddressForm(data);
                        this.loading = false;
                    },
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
        }
    }

    // shows cpf/cnpj invalid message modal
    onCpfCnpjInvalid(tipo) {
        this.cpfCnpj = tipo;
        this.openModal('modal-validator-cpf-cnpj');
        this.loading = false;
        if (tipo === 'CPF') {
            this.pessoaFisicaForm.controls.cpf.reset();
        } else {
            this.pessoaJuridicaForm.controls.cnpj.reset();
        }
    }

    openModal(id) {
        this.modalService.open(id);
    }

    // remove state tag
    removeJob(job) {
        this.jobTags.splice(job, 1);
    }

    // sets values on pf form and gets address, resume and activities datas
    setValuesOnPfForm(pessoaFisica) {
        this.count = 0;
        if (pessoaFisica) {
            this.pessoaFisica = pessoaFisica;
            this.addrService.get(this.pessoaFisica.id, this.user.personType, this.user.token)
                .subscribe((endereco => this.setValuesOnAddressForm(endereco)));
            this.resService.get(this.pessoaFisica.id, this.user.personType, this.user.token)
                .subscribe(resume => this.setValuesOnResumeForm(resume));
            this.actService.get(this.pessoaFisica.id, this.user.personType, this.user.token)
                .subscribe(data => this.showAtividadesList(data.atividades));
            this.pessoaFisicaForm.setValue({
                cpf: this.pessoaFisica.cpf,
                rg: this.pessoaFisica.rg || '',
                nascimento: this.pessoaFisica.nascimento || '',
                sexo: this.pessoaFisica.sexo,
                idade: this.calcIdade(this.pessoaFisica.nascimento) || '',
                nome: this.pessoaFisica.nome,
                email: this.pessoaFisica.email,
                email2: this.pessoaFisica.email2 || '',
                tel: this.pessoaFisica.tel || '',
                tel2: this.pessoaFisica.tel2 || '',
                cel: this.pessoaFisica.cel || '',
                cel2: this.pessoaFisica.cel2 || ''
            });
            const el = document.getElementById('idade') as HTMLInputElement;
            if (el.value !== '') {
                el.value = this.calcIdade(this.pessoaFisica.nascimento).toString();
            }
        } else {
            this.loading = false;
        }
    }

    setValuesOnLoginForm(user) {
        if (user) {
            this.loginForm.patchValue({
                login: user.email,
                password: this.user.password
            })
        }
    }

    // sets values on pf form and gets address, resume and activities datas
    setValuesOnPjForm(pessoaJuridica) {
        if (pessoaJuridica) {
            this.pessoaJuridica = pessoaJuridica;
            this.addrService.get(this.pessoaJuridica.id, this.user.personType, this.user.token)
                .subscribe((endereco => this.setValuesOnAddressForm(endereco)));
            this.resService.get(this.pessoaJuridica.id, this.user.personType, this.user.token)
                .subscribe(resume => this.setValuesOnResumeForm(resume));
            this.actService.get(this.pessoaJuridica.id, this.user.personType, this.user.token)
                .subscribe(data => this.showAtividadesList(data.atividades));
            this.pessoaJuridicaForm.setValue({
                razao_social: this.pessoaJuridica.razao_social,
                nome_fantasia: this.pessoaJuridica.nome_fantasia,
                cnpj: this.pessoaJuridica.cnpj,
                nome_contato: this.pessoaJuridica.nome_contato,
                email: this.pessoaJuridica.email,
                email2: this.pessoaJuridica.email2 || '',
                tel: this.pessoaJuridica.tel || '',
                tel2: this.pessoaJuridica.tel2 || '',
                cel: this.pessoaJuridica.cel || '',
                cel2: this.pessoaJuridica.cel2 || ''
            });
        } else {
            this.loading = false;
        }
    }

    showAtividadesList(atividades) {
        this.jobTags = atividades.split(',');
        this.count++;
        if (this.count === 3) { this.loading = false; }
    }

    setValuesOnAddressForm(endereco) {
        if (endereco) {
            if (endereco.erro === true) {
                return;
            }
            this.endereco = endereco;
            this.addressForm.setValue({
                cep: this.endereco.cep || '',
                rua: this.endereco.rua || endereco.logradouro || '',
                numero: this.endereco.numero || '',
                complemento: this.endereco.complemento || '',
                bairro: this.endereco.bairro || endereco.bairro || '',
                cidade: this.endereco.cidade || endereco.localidade || '',
                estado: this.endereco.estado || endereco.uf || '',
            });
            this.count++;
            if (this.count === 3) { this.loading = false; }
        } else {
            this.loading = false;
        }
    }

    setValuesOnResumeForm(resume) {
        if (resume) {
            this.resumeForm.setValue(resume.apresentacao);
            if (this.count === 3) { this.loading = false; }
        } else {
            this.loading = false;
        }
    }

    selectState(state) {
        this.addressForm.patchValue({estado: state}) ;
        this.showStates = false;
    }
}
