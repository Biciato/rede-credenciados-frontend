import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Atividade } from '../../models/atividade';
import { ActivityService } from '../../services/activity/activity.service';
import { InitialRegisterUnidadeService } from '../../services/initial-register-unidade/initial-register-unidade.service';
import { ModalService } from '../../services/modal/modal.service';
import { PessoaJuridicaService } from '../../services/pessoa-juridica/pessoa-juridica.service';
import { CEPService } from 'src/app/services/cep/cep.service';

@Component({
    selector: 'app-unity-register',
    templateUrl: 'unity-register.component.html',
    styleUrls: ['unity-register.component.scss']
})

export class UnityRegisterComponent implements OnInit {
    @Output() registered = new EventEmitter<boolean>();

    // initiating unidade FormGroup
    unidadeForm = new FormGroup({
        razaoSocial: new FormControl(''),
        nomeFantasia: new FormControl(''),
        cnpj: new FormControl(''),
        nomeContato: new FormControl(''),
        email: new FormControl(''),
        email2: new FormControl(''),
        tel: new FormControl(''),
        tel2: new FormControl(''),
        cel: new FormControl(''),
        cel2: new FormControl(''),
        cep: new FormControl(''),
        rua: new FormControl(''),
        numero: new FormControl(''),
        complemento: new FormControl(''),
        bairro: new FormControl(''),
        cidade: new FormControl(''),
        estado: new FormControl(''),
        apresentacao: new FormControl('')
    });
    jobsFull = [];
    jobListShow = false;
    jobClicked = 'Selecione suas especialidades:';
    jobTags: Array<Atividade>;
    loading = false;
    jobIds = [];
    pjId: number;

    constructor(private activityService: ActivityService,
                private cepService: CEPService,
                private iruService: InitialRegisterUnidadeService,
                private modalService: ModalService,
                private pjService: PessoaJuridicaService,
                private router: Router) {
        this.jobTags = [];
    }

    ngOnInit() {
        this.loading = true;
        // gets services list from server
        this.activityService.all()
            .subscribe(
                activityList => activityList.map(atividade => this.jobsFull.push(atividade)),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                },
                () => this.loading = false
            );
        // passes pj's id to unity information parent component
        this.pjService.pjId$.subscribe(id => this.pjId = id);
    }

    // sends unity data to server
    onSubmit() {
        this.loading = true;
        this.iruService.register(
            {
                id: this.pjId,
                cnpj: this.unidadeForm.value.cnpj,
                razao_social: this.unidadeForm.value.razaoSocial,
                nome_fantasia: this.unidadeForm.value.nomeFantasia,
                nome_contato: this.unidadeForm.value.nomeContato,
                email: this.unidadeForm.value.email,
                email2: this.unidadeForm.value.email2,
                tel: this.unidadeForm.value.tel,
                tel2: this.unidadeForm.value.tel2,
                cel: this.unidadeForm.value.cel,
                cel2: this.unidadeForm.value.cel2,
                cep: this.unidadeForm.value.cep,
                rua: this.unidadeForm.value.rua,
                numero: this.unidadeForm.value.numero,
                complemento: this.unidadeForm.value.complemento,
                bairro: this.unidadeForm.value.bairro,
                cidade: this.unidadeForm.value.cidade,
                estado: this.unidadeForm.value.estado,
                apresentacao: this.unidadeForm.value.apresentacao,
                atividades: this.jobTags.toString()
            }
        ).subscribe(
                () => this.closeModal(),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }
    closeModal() {
        this.loading = false;
        this.router.navigate([{ outlets: { unidade: ['register-unidade'] }}]);
        this.modalService.close('custom-modal-4');
        this.registered.emit(true);
    }

    // method that hide jobs list
    clearJobDiv() {
        this.jobListShow = false;
    }

    // method that show jobs
    showJobs() {
        this.jobListShow = !this.jobListShow;
    }

    // method that select a job
    selectJob(job) {
        this.jobClicked = job.atividade;
        this.jobListShow = false;
        if (this.jobTags.includes(job.atividade) === false) {this.jobTags.push(job.atividade); }
        if (this.jobIds.includes(job.id) === false) {
            this.jobIds.push(job.id);
        }
    }

    // remove state tag
    removeJob(job) {
        this.jobTags.splice(job, 1);
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
           this.iruService.checkCnpj(event.target.value).subscribe(
               (data) => Object.entries(data).length === 0
                    && data.constructor === Object ? data : window.alert('CNPJ já cadastrado'),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
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
                .subscribe(data => this.setValuesOnAddressForm(data), () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }, () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
        }
    }

    setValuesOnAddressForm(data) {
        this.loading = false;
        this.unidadeForm.patchValue({
            rua: data.logradouro || '',
            bairro: data.bairro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
        });
    }
}
