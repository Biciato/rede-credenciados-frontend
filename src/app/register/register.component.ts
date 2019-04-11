import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { InitialRegisterService } from '../services/initial-register/initial-register.service';
import { ModalService } from '../services/modal/modal.service';
import { PessoaJuridicaService } from '../services/pessoa-juridica/pessoa-juridica.service';
import { PessoaFisicaService } from '../services/pessoa-fisica/pessoa-fisica.service';
import { RegisterService } from '../services/register/register.service';

import { User } from '../models/user';
import { AtividadesComponent } from '../atividades/atividades.component';
import { Router } from '@angular/router';
import { UnityService } from '../services/unity/unity.service';

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.scss']
})

export class RegisterComponent implements OnInit {
    @ViewChild(AtividadesComponent)
    private ativComp: AtividadesComponent;

    cpfCnpj: string;

    jobsFull = [];
    jobClicked = 'Selecione suas especialidades:';
    jobTags = [];
    jobIds = [];

    loading = false;

    tipoPessoa = 'pessoa_juridica';

    pessoaFisicaForm = new FormGroup({
        cpf: new FormControl(null, {validators: [Validators.required,
            Validators.minLength(14)], updateOn: 'blur' } ),
        name: new FormControl(null, Validators.required)
    });

    pessoaJuridicaForm = new FormGroup({
        nome_fantasia: new FormControl(null, Validators.required),
        razao_social: new FormControl(null, Validators.required),
        cnpj: new FormControl(null, {validators: [Validators.required,
            Validators.minLength(18)], updateOn: 'blur' }),
        nome_contato: new FormControl(null, Validators.required),
    });

    // initiating register form group
    registerForm = new FormGroup({
        email: new FormControl(null, {validators: [Validators.required,
            Validators.email], updateOn: 'blur' }),
        password: new FormControl(null, {validators: [Validators.required,
            Validators.minLength(6)], updateOn: 'blur' }),
    });

    constructor(
        private initialRegisterService: InitialRegisterService,
        private modalService: ModalService,
        private pfService: PessoaFisicaService,
        private pjService: PessoaJuridicaService,
        private registerService: RegisterService,
        private router: Router,
        private unityService: UnityService
    ) {}

    ngOnInit() {
        this.jobTags = this.ativComp.atividadesSelected;
    }

    get razao_social() { return this.pessoaJuridicaForm.get('razao_social'); }
    get nome_fantasia() { return this.pessoaJuridicaForm.get('nome_fantasia'); }
    get nome_contato() { return this.pessoaJuridicaForm.get('nome_contato'); }
    get cnpj() { return this.pessoaJuridicaForm.get('cnpj'); }
    get cpf() { return this.pessoaFisicaForm.get('cpf'); }
    get name() { return this.pessoaFisicaForm.get('name'); }
    get password() { return this.registerForm.get('password'); }
    get sexo() { return this.registerForm.get('sexo'); }
    get email() { return this.registerForm.get('email'); }

    checkEmail(email) {
        this.loading = true;
        this.registerService.checkUserEmail(email)
            .subscribe(
                (data) => {
                    Object.entries(data).length === 0 &&
                    data.constructor === Object ? this.emailValidation() : this.openModal('modal-validator-email');
                    this.loading = false;
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    emailValidation() {
        this.loading = true;
        this.registerService.emailValidation({email: this.registerForm.value.email})
            .subscribe(
                (data) => {
                    data === true ? this.registerUser() : this.openModal('modal-email-validation');
                    this.loading = false;
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
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

    openModal(id: string) {
        this.modalService.open(id);
        if (id === 'modal-registro') {
            this.registerForm.reset();
            this.pessoaFisicaForm.reset();
            this.pessoaJuridicaForm.reset();
            this.jobTags = [];
            this.router.navigate(['/']);
            setTimeout(() => this.loading = false, 2000);
        }
    }

    // remove state tag
    removeJob(job) {
        this.jobTags.splice(job, 1);
    }

    // sends register data to api server
    register() {
        if ( this.registerForm.valid && ((this.tipoPessoa === 'pessoa_fisica' && this.pessoaFisicaForm.valid) ||
            (this.tipoPessoa === 'pessoa_juridica' && this.pessoaJuridicaForm.valid)) ) {
            if (this.ativComp.atividadesSelected.length > 0) {
                this.checkEmail(this.registerForm.value.email);
            } else {
                this.openModal('modal-empty-activities');
            }
        } else {
            this.openModal('modal-validator');
        }
    }

    // links user registration to activities, address and resume data
    registerAtividadeEnderecoApresentacao(user, pessoa) {
         this.initialRegisterService.register(pessoa, this.ativComp.atividadesSelected.toString())
             .subscribe(() => this.redirectAfterSuccess(user), () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            });
    }

    // redirects to /home and shows successful message
    redirectAfterSuccess(user) {
        this.registerService.verifyEmail(
            {
                id: user.id,
                email: user.email
            }
        ).subscribe(
            () => this.openModal('modal-registro'),
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }

    // create pf or pj from user's data on api server
    registerPfOrPj(user: User) {
        if (user.tipo_pessoa === 'pessoa_fisica') {
            let sexo: string;
            const el = document.querySelector('input[name="sexo"]:checked') as HTMLInputElement;
            sexo = el.value;
            this.pfService.register({
                nome: this.pessoaFisicaForm.value.name,
                user_id: user.id,
                email: this.registerForm.value.email,
                cpf: this.pessoaFisicaForm.value.cpf,
                sexo,
                nascimento: null,
                rg: '',
                email2: '',
                tel: '',
                tel2: '',
                cel: '',
                cel2: ''
            }).subscribe(
                (pessoaFisica) => this.registerAtividadeEnderecoApresentacao(user, pessoaFisica),
                () => {
                    this.loading = false;
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                }
            );
        } else if (user.tipo_pessoa === 'pessoa_juridica') {
            this.pjService.register({
                cnpj: this.pessoaJuridicaForm.value.cnpj,
                user_id: user.id,
                email: this.registerForm.value.email,
                razao_social: this.pessoaJuridicaForm.value.razao_social,
                nome_fantasia: this.pessoaJuridicaForm.value.nome_fantasia,
                nome_contato: this.pessoaJuridicaForm.value.nome_contato,
                email2: '',
                tel: '',
                tel2: '',
                cel: '',
                cel2: ''
            }).subscribe(
                (pessoaJuridica) => this.registerAtividadeEnderecoApresentacao(user, pessoaJuridica),
                () => {
                    this.loading = false;
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                }
            );
        } else {
            this.loading = false;
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        }
    }

    registerUser() {
        this.loading = true;
        this.registerService.registerUser(
                {
                    name: this.pessoaFisicaForm.value.name || this.pessoaJuridicaForm.value.nome_contato,
                    email: this.registerForm.value.email,
                    tipo_pessoa: this.tipoPessoa,
                    password: this.registerForm.value.password,
                    password_confirmation: this.registerForm.value.password
                }
            ).subscribe(
                user => this.registerPfOrPj(user),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    tipoPessoaSelected(tipoPessoa) {
        this.tipoPessoa = tipoPessoa;
    }
}
