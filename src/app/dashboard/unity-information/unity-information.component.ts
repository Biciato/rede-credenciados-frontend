import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AtividadesComponent } from '../../atividades/atividades.component';

import { ModalService } from '../../services/modal/modal.service';
import { PessoaJuridicaService } from '../../services/pessoa-juridica/pessoa-juridica.service';
import { EnderecoUnidadeService } from '../../services/endereco-unidade/endereco-unidade.service';
import { UnityService } from '../../services/unity/unity.service';
import { InitialRegisterUnidadeService } from '../../services/initial-register-unidade/initial-register-unidade.service';
import { AvatarService } from '../../services/avatar/avatar.service';
import { ActivityService } from '../../services/activity/activity.service';
import { AtividadeUnidadeService } from '../../services/atividade-unidade/atividade-unidade.service';
import { ApresentacaoUnidadeService } from '../../services/apresentacao-unidade/apresentacao-unidade.service';
import { CEPService } from '../../services/cep/cep.service';

import { Atividade } from '../../models/atividade';
import { Endereco } from '../../models/endereco';
import { PessoaJuridica } from 'src/app/models/pessoa-juridica';

import { environment } from '../../../environments/environment';
import { RegisterService } from 'src/app/services/register/register.service';
import { Unidade } from 'src/app/models/unidade';
import { stateValidator } from '../../validators/state.validator';

import { ABVR_ESTADO_INVERSO, ABVR_ESTADO } from '../../models/abreviacao-estados';
import { ArquivoService } from 'src/app/services/arquivo/arquivo.service';

import { interval } from 'rxjs';
import { map, retryWhen } from 'rxjs/operators';

@Component({
    selector: 'app-unity-information',
    templateUrl: 'unity-information.component.html',
    styleUrls: ['unity-information.component.scss']
})

export class UnityInformationComponent implements OnInit {
    @ViewChild(AtividadesComponent)
    private ativComp: AtividadesComponent;

    active: string;
    // Initiating Resume Form
    apresentacaoForm = new FormControl({ value: '', disabled: true }, Validators.required);
    arquivos = [];
    arquivosSelected = [];

    baseUrlArquivos = environment.baseUrlArquivos;
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

    currentSlide = '../../../assets/images/sem-foto.jpg';

    editUnityButton = true;
    endereco: Endereco;
    editAddressBtn = true;
    editResumeBtn = true;
    editServicesBtn = true;

    enderecoForm = new FormGroup({
        cep: new FormControl({ value: '', disabled: true},
            {validators: [Validators.required, Validators.minLength(9)], updateOn: 'blur' }),
        rua: new FormControl({ value: '', disabled: true}, Validators.required),
        numero: new FormControl({ value: '', disabled: true}, Validators.required),
        complemento: new FormControl({ value: '', disabled: true}),
        bairro: new FormControl({ value: '', disabled: true}, Validators.required),
        cidade: new FormControl({ value: '', disabled: true}, Validators.required),
        estado: new FormControl({ value: '', disabled: true},
            { validators: [Validators.required, stateValidator()], updateOn: 'blur'} )
    });

    jobIds = [];

    imageToShow = '../../../assets/images/sem-foto.jpg' ;

    loading = false;

    newUnityFlag = false;
    noUnity = true;

    jobsFull = [];
    jobClicked = 'Selecione suas especialidades:';
    jobTags: Atividade[];

    pessoaJuridica: PessoaJuridica;

    resumeFlag = false;

    saveUnityButton = false;
    saveAddressBtn = false;
    saveServicesBtn = false;
    saveResumeBtn = false;
    showStates = false;
    slideHome = [];
    stateSelected: string;
    submitted = false;

    unidadeForm = new FormGroup({
        razao_social: new FormControl({ value: null, disable: true}, Validators.required),
        nome_fantasia: new FormControl({ value: '', disabled: true}, Validators.required),
        cnpj: new FormControl({ value: null, disable: true},
            {validators: [Validators.required, Validators.minLength(18)], updateOn: 'blur' }),
        nome_contato: new FormControl({ value: '', disabled: true}, Validators.required),
        email: new FormControl({ value: '', disabled: true},
            { validators: [Validators.required, Validators.email], updateOn: 'blur' }),
        email2: new FormControl({ value: '', disabled: true}, { validators: Validators.email,
            updateOn: 'blur'}),
        tel: new FormControl({ value: '', disabled: true},
            {validators: [Validators.required, Validators.minLength(14)], updateOn: 'blur' }),
        tel2: new FormControl({ value: '', disabled: true},
            {validators: Validators.minLength(14), updateOn: 'blur' }),
        cel: new FormControl({ value: '', disabled: true},
            {validators: Validators.minLength(15), updateOn: 'blur' }),
        cel2: new FormControl({ value: '', disabled: true},
            {validators: Validators.minLength(15), updateOn: 'blur' }),
    });
    unidades = [];
    unitySelected: Unidade;
    unitySelectedId: number;
    unitiesMock: string[];
    unidadeFlag = false;
    user: any;

    constructor(
        private activityService: ActivityService,
        private apresUniService: ApresentacaoUnidadeService,
        private arqService: ArquivoService,
        private atiUniService: AtividadeUnidadeService,
        private avatarService: AvatarService,
        private cepService: CEPService,
        private endUniService: EnderecoUnidadeService,
        private modalService: ModalService,
        private initialRegisterUnidadeService: InitialRegisterUnidadeService,
        private unityService: UnityService,
        private registerService: RegisterService,
        private pjService: PessoaJuridicaService,
        private router: Router
    ) {}

    ngOnInit() {
        this.user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
        this.pjService.getPessoaJuridica(this.user.id, this.user.token)
            .subscribe(pj => {
                    this.pessoaJuridica = pj;
                    this.getUnidadesList();
                }, () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                });
        this.activityService.all()
            .subscribe(
                activityList => activityList.map(atividade => this.jobsFull.push(atividade)),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                }
            );
        this.jobTags = [];
    }

    get razao_social() { return this.unidadeForm.get('razao_social'); }
    get nome_fantasia() { return this.unidadeForm.get('nome_fantasia'); }
    get nome_contato() { return this.unidadeForm.get('nome_contato'); }
    get cnpj() { return this.unidadeForm.get('cnpj'); }
    get email() { return this.unidadeForm.get('email'); }
    get email2() { return this.unidadeForm.get('email2'); }
    get tel() { return this.unidadeForm.get('tel'); }
    get tel2() { return this.unidadeForm.get('tel2'); }
    get cel() { return this.unidadeForm.get('cel'); }
    get cel2() { return this.unidadeForm.get('cel2'); }

    get cep() { return this.enderecoForm.get('cep'); }
    get rua() { return this.enderecoForm.get('rua'); }
    get numero() { return this.enderecoForm.get('numero'); }
    get complemento() { return this.enderecoForm.get('complemento'); }
    get bairro() { return this.enderecoForm.get('bairro'); }
    get cidade() { return this.enderecoForm.get('cidade'); }
    get estado() { return this.enderecoForm.get('estado'); }

    get apresentacao() { return this.apresentacaoForm.get('apresentacao'); }

    addOrRemove(event) {
        const nomeArquivo = event.target.name.replace('arquivos-unidade/' + this.unitySelectedId + '/imagens/', '');
        this.arquivosSelected.includes(nomeArquivo) ?
            this.arquivosSelected.splice(nomeArquivo, 1) :
            this.arquivosSelected.push(nomeArquivo);
    }

    chooseArquivo() {
        document.getElementById('arquivo').click();
    }

    closeModal(id) {
        this.modalService.close(id);
    }

    // triggers input click after user selects an image from his files
    chooseAvatar() {
        document.getElementById('avatar').click();
    }

    deleteAvatar() {
        this.loading = true;
        this.avatarService.deleteUnidadeAvatar(this.user.id, this.unitySelectedId)
            .subscribe(
                () => {
                    this.imageToShow = '../../../assets/images/sem-foto.jpg';
                    this.loading = false;
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    disableUnidadeForm() {
        this.loading = false;
        this.router.navigate([{ outlets: { update: ['update-message'] }}]);
        this.saveUnityButton = false;
        this.editUnityButton = true;
        this.unidadeForm.disable();
        this.getUnidadesList();
    }

    disableEnderecoForm() {
        this.loading = false;
        this.router.navigate([{ outlets: { update: ['update-message'] }}]);
        this.saveAddressBtn = false;
        this.editAddressBtn = true;
        this.enderecoForm.disable();
    }

    disableAtividadesEdit() {
        this.loading = false;
        this.router.navigate([{ outlets: { update: ['update-message'] }}]);
        this.saveServicesBtn = false;
        this.editServicesBtn = true;
        this.getUnidadesList();
    }

    disableApresentacaoForm() {
        this.loading = false;
        this.router.navigate([{ outlets: { update: ['update-message'] }}]);
        this.saveResumeBtn = false;
        this.editResumeBtn = true;
        this.apresentacaoForm.disable();
        this.getUnidadesList();
    }

    // handles buttons to show accordingly to props states on address and unity form
    editAddressForm() {
        this.enderecoForm.enable();
        this.saveAddressBtn = true;
        this.editAddressBtn = false;
        this.unidadeForm.enable();
        this.saveUnityButton = true;
        this.editUnityButton = false;
    }

    editNewUnity() {
        this.noUnity = false;
        this.newUnityFlag = true;
        this.unidadeForm.reset();
        this.enderecoForm.reset();
        this.apresentacaoForm.reset();
        this.jobTags = [];
        this.enderecoForm.enable();
        this.unidadeForm.enable();
        this.apresentacaoForm.enable();
        this.editAddressBtn = false;
        this.editResumeBtn = false;
        this.editUnityButton = false;
        this.editServicesBtn = false;
        this.resumeFlag = true;
    }

    // handles buttons to show accordingly to props states on services form
    editServicesForm() {
        this.modalService.open('modal-atividades');
        this.activityService.passAtividadesToComponent(this.jobTags);
        this.saveServicesBtn = true;
        this.editServicesBtn = false;
    }

    // handles buttons to show accordingly to props states on resume form
    editResumeForm() {
        this.apresentacaoForm.enable();
        this.saveResumeBtn = true;
        this.editResumeBtn = false;
    }

    getUnidadesList() {
        this.loading = true;
        this.pjService.passPjId(this.pessoaJuridica.id);
        this.unityService.list(this.pessoaJuridica.id, this.user.token)
            .subscribe(data => {
                this.unidades = data;
                this.setValuesOnUnityForm(data[0]);
            }, () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
    }

    getIdxImgs() {
        this.slideHome = [];
        this.arquivos = [];
        this.arqService.indexUnityImgs(this.unitySelectedId).subscribe(
            idx => {
                idx.forEach((element: string) => {
                    this.slideHome.push(element);
                    this.arquivos.push(element.replace('arquivos-unidades/' + this.unitySelectedId + '/imagens/',
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
            if (this.unitySelected) {
                if (event.target.value === this.unitySelected.cnpj) {
                    return;
                }
            }
            this.registerService.checkCnpj(event.target.value).subscribe(
                (data) => Object.entries(data).length === 0
                    && data.constructor === Object ? this.loading = false : this.onCnpjInvalid(),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
            this.unityService.checkCnpj(event.target.value).subscribe(
                (data) => Object.entries(data).length === 0
                    && data.constructor === Object ? this.loading = false : this.onCnpjInvalid(),
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
        }
    }

    onCnpjInvalid() {
        this.openModal('modal-cnpj-invalid');
        this.unidadeForm.controls.cnpj.reset();
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
                });
        }
    }

    onRegistered() {
        this.getUnidadesList();
    }

    // sends address and unity data to server
    onEnderecoFormSubmit() {
        if (this.enderecoForm.valid && this.unidadeForm.valid) {
            this.loading = true;
            if (this.enderecoForm.value.estado.length > 2) {
                this.stateSelected = ABVR_ESTADO_INVERSO[this.enderecoForm.value.estado];
            } else {
                this.stateSelected = this.enderecoForm.value.estado;
            }
            this.endUniService.update(this.unitySelectedId,
                {
                    cep: this.enderecoForm.value.cep,
                    rua: this.enderecoForm.value.rua,
                    numero: this.enderecoForm.value.numero,
                    complemento: this.enderecoForm.value.complemento,
                    bairro: this.enderecoForm.value.bairro,
                    cidade: this.enderecoForm.value.cidade,
                    estado: this.stateSelected
                }
                , this.user.token)
                .subscribe(() => this.disableEnderecoForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
            this.unityService.update(this.unitySelectedId, this.unidadeForm.value, this.user.token)
                .subscribe(() => this.disableUnidadeForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
        } else {
            this.resumeFlag = false;
            this.unidadeFlag = true;
            this.openModal('modal-validator');
        }
    }

    // sends activities data to server
    onAtividadesSubmit() {
        if (this.ativComp.atividadesSelected.length > 0) {
            this.loading = true;
            this.atiUniService.update(this.unitySelectedId,
                this.ativComp.atividadesSelected.toString(), this.user.token)
                .subscribe(() => this.disableAtividadesEdit(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
        } else {
            this.openModal('modal-empty-activities');
        }
    }

    // sends resume data to server
    onApresentacaoFormSubmit() {
        if (this.apresentacaoForm.valid) {
            this.loading = true;
            this.apresUniService.update(this.unitySelectedId,
                this.apresentacaoForm.value, this.user.token)
                .subscribe(() => this.disableApresentacaoForm(), () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    });
        } else {
            this.unidadeFlag = false;
            this.resumeFlag = true;
            this.openModal('modal-validator');
        }
    }

    openModal(id) {
        this.activityService.passAtividadesToComponent(this.jobTags);
        this.modalService.open(id);
    }

    newUnity() {
        if ( this.unidadeForm.valid && this.enderecoForm.valid && this.apresentacaoForm.valid) {
            if (this.jobTags.length > 0) {
                this.loading = true;
                if (this.enderecoForm.value.estado.length > 2) {
                    this.stateSelected = ABVR_ESTADO_INVERSO[this.enderecoForm.value.estado];
                } else {
                    this.stateSelected = this.enderecoForm.value.estado;
                }
                this.initialRegisterUnidadeService.register(
                {
                    id: this.pessoaJuridica.id,
                    cnpj: this.unidadeForm.value.cnpj,
                    razao_social: this.unidadeForm.value.razao_social,
                    nome_fantasia: this.unidadeForm.value.nome_fantasia,
                    nome_contato: this.unidadeForm.value.nome_contato,
                    email: this.unidadeForm.value.email,
                    email2: this.unidadeForm.value.email2,
                    tel: this.unidadeForm.value.tel,
                    tel2: this.unidadeForm.value.tel2,
                    cel: this.unidadeForm.value.cel,
                    cel2: this.unidadeForm.value.cel2,
                    cep: this.enderecoForm.value.cep,
                    rua: this.enderecoForm.value.rua,
                    numero: this.enderecoForm.value.numero,
                    complemento: this.enderecoForm.value.complemento,
                    bairro: this.enderecoForm.value.bairro,
                    cidade: this.enderecoForm.value.cidade,
                    estado: this.stateSelected,
                    apresentacao: this.apresentacaoForm.value,
                    atividades: this.jobTags.toString()
                }
            ).subscribe(
                    () => {
                        this.getUnidadesList();
                        this.router.navigate([{ outlets: { unidade: ['register-unidade'] }}]);
                        this.editAddressBtn = false;
                        this.editResumeBtn = false;
                        this.editUnityButton = false;
                        this.editServicesBtn = false;
                        this.resumeFlag = false;
                        this.loading = false;
                    },
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
            } else {
                this.openModal('modal-empty-activities');
            }

        } else {
            this.openModal('modal-validator');
        }
    }

    removeArquivo() {
        this.arquivosSelected.forEach(
            el => {
                this.loading = true;
                this.arqService.deleteUnityImg(this.unitySelectedId, el, this.user.token).subscribe(
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

    // remove state tag
    removeJob(job) {
        this.jobTags.splice(job, 1);
    }

    // sets values on Unity Form from server
    setValuesOnUnityForm(unidade) {
        this.loading = false;
        if (unidade) {
            this.noUnity = false;
            this.unitySelected = unidade.nome_fantasia;
            this.unitySelectedId = unidade.id;
            this.endUniService.get(unidade.id, this.user.token)
                .subscribe((endereco => this.setValuesOnAddressForm(endereco)));
            this.apresUniService.get(unidade.id, this.user.token)
                .subscribe(apresentacao => this.setValuesOnResumeForm(apresentacao));
            this.atiUniService.get(unidade.id, this.user.token)
                .subscribe(data => this.showAtividadesList(data.atividades));
            this.unidadeForm.setValue({
                razao_social: unidade.razao_social,
                nome_fantasia: unidade.nome_fantasia,
                cnpj: unidade.cnpj,
                nome_contato: unidade.nome_contato,
                email: unidade.email,
                email2: unidade.email2,
                tel: unidade.tel,
                tel2: unidade.tel2,
                cel: unidade.cel,
                cel2: unidade.cel2
            });
            this.avatarService.showUnidadeAvatar(this.user.id, unidade.id).subscribe(
                (data) => data.length > 0 ? this.imageToShow = this.baseUrlArquivos + data :
                    this.imageToShow = '../../../assets/images/sem-foto.jpg',
                () => this.imageToShow = '../../../assets/images/sem-foto.jpg'
            );
            this.getIdxImgs();
        }
    }

    showAtividadesList(atividades) {
        if (atividades) {
            this.jobTags = atividades.split(',');
        }
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

    // sets values to Address Form from server
    setValuesOnAddressForm(endereco) {
        this.loading = false;
        if (endereco) {
            if (endereco.erro === true) {
                return;
            }
            this.endereco = endereco;
            this.enderecoForm.setValue({
                cep: this.endereco.cep || '',
                rua: this.endereco.rua || endereco.logradouro || '',
                numero: this.endereco.numero || '',
                complemento: this.endereco.complemento || '',
                bairro: this.endereco.bairro || endereco.bairro || '',
                cidade: this.endereco.cidade || endereco.localidade || '',
                estado: ABVR_ESTADO[this.endereco.estado] || ABVR_ESTADO[endereco.uf] || '',
            });
        }
    }

    setValuesOnResumeForm(resume) {
        if (resume) { this.apresentacaoForm.setValue(resume.apresentacao); }
    }

    selectState(state) {
        this.enderecoForm.patchValue({estado: state}) ;
        this.showStates = false;
    }

    // enables unity form to be edit
    unityClicked(event, i) {
        const els = document.getElementsByClassName('unity-active');
        els[0].classList.remove('unity-active');
        event.target.classList.add('unity-active');
        this.setValuesOnUnityForm(this.unidades[i]);
    }

    // send img file to server
    uploadAvatar() {
        const avatar = document.getElementById('avatar') as HTMLInputElement;
        const formData = new FormData();
        formData.append('avatar', avatar.files[0]);
        if (avatar.files[0].type === 'image/jpeg') {
            this.loading = true;
            this.avatarService.updateUnidadeAvatar(formData, this.user.id,
                this.unitySelectedId, avatar.files[0].name)
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

    uploadArquivo() {
        const arquivo = document.getElementById('arquivo') as HTMLInputElement;
        const formData = new FormData();
        formData.append('arquivo', arquivo.files[0]);
        if (arquivo.files[0].type === 'image/jpeg') {
            this.loading = true;
            this.arqService.storeUnityImg(formData, this.unitySelectedId, arquivo.files[0].name)
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
