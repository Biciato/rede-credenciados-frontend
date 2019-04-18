import { Component, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ActivityService } from '../services/activity/activity.service';
import { CitiesService } from '../services/cities/cities.service';
import { CotacaoService } from '../services/cotacao/cotacao.service';
import { LoginService } from '../services/login/login.service';
import { ModalService } from '../services/modal/modal.service';
import { UserIdAndEmailService } from '../services/user-id-email/user-email-id.service';

import { Atividade } from '../models/atividade';
import { CITYCODE } from '../models/city-code';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
    styleUrls: ['header.component.scss']
})

export class HeaderComponent {

    adminMode = false;
    // initiating cotacao form group
    cotacaoForm = new FormGroup({
        nome: new FormControl(null, Validators.required),
        email: new FormControl(null, {validators: [Validators.required,
            Validators.email], updateOn: 'blur' } ),
        cel: new FormControl(null, {validators: Validators.minLength(15), updateOn: 'blur' } ),
        tel: new FormControl(null, {validators: [Validators.required,
            Validators.minLength(14)], updateOn: 'blur' } ),
        mensagem: new FormControl(null, Validators.required),
    });
    dashboardMode: boolean;
    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });
    resetPasswordForm = new FormGroup({
        password: new FormControl(null, { validators: [Validators.required,
            Validators.minLength(6)], updateOn: 'blur' }),
        newPassword: new FormControl(null, { validators: [Validators.required,
            Validators.minLength(6)], updateOn: 'blur' }),
        newPasswordConfirmation: new FormControl(null, { validators: [Validators.required,
            Validators.minLength(6)], updateOn: 'blur' })
    });
    links = [
            'Principal',
            'Quem Somos',
            'Cadastre-se grátis',
            'Solicitar cotações',
            // 'Currículos',
            'Anúncios',
            'Contato'
        ];
    loading = false;
    userPassword: string;
    userEmail: string;
    brStates: string[];
    jobsFull: Atividade[];
    jobListShow: boolean;
    citiesShow: boolean;
    citiesShowModal = false;
    statesShow: boolean;
    statesShowModal: boolean;
    jobClicked: Atividade;
    cityClicked: string;
    cityClickedModal: string;
    stateClicked: string;
    stateSelected: string;
    stateClickedModal: string;
    stateSelectedModal: string;
    stateTags: string[];
    cities: any[];
    cityTags: string[];
    resized: boolean;
    stateName: string;
    searchCity: string;
    verPerfilMode = false;
    telValid = false;
    passwordResetFlag = false;
    cotacaoFlag = false;
    user: any;

    // event that is trigger by section component to set dashboard mode
    @HostListener('window:reset', ['$event']) dashEnter(event) {
        this.dashboardMode = true;
    }


    constructor(
        private activityService: ActivityService,
        private citiesService: CitiesService,
        private cotService: CotacaoService,
        private location: Location,
        private loginService: LoginService,
        private modalService: ModalService,
        private route: ActivatedRoute,
        private router: Router,
        private userIdEmailService: UserIdAndEmailService
    ) {
        this.dashboardMode = false;
        // sorting State names
        this.brStates = [
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
        // setting job label with initial value
        this.jobClicked = {atividade: 'Selecione a especialidade'};
        this.jobsFull = [];
        // initiating Arrays
        this.cities = [];
        this.cityTags = [];
        this.stateTags = [];
        // setting city label with initial value
        this.cityClicked = 'Selecione a cidade: ';
        // setting state label with initial value
        this.stateClicked = 'Selecione o Estado: ';

        if (this.location.path().includes('dashboard')) {
            this.dashboardMode = true;
        }
        if (this.location.path().includes('dashboard-admin')) {
            this.dashboardMode = true;
            this.adminMode = true;
        }
    }

    get nome() { return this.cotacaoForm.get('nome'); }
    get email() { return this.cotacaoForm.get('email'); }
    get tel() { return this.cotacaoForm.get('tel'); }
    get cel() { return this.cotacaoForm.get('cel'); }
    get mensagem() { return this.cotacaoForm.get('mensagem'); }

    get password() { return this.resetPasswordForm.get('password'); }
    get newPassword() { return this.resetPasswordForm.get('newPassword'); }
    get newPasswordConfirmation() { return this.resetPasswordForm.get('newPasswordConfirmation'); }

    backToDash() {
        this.router.navigate([`dashboard/minhas-informacoes`]);
        this.verPerfilMode = false;
    }

    backToDashAdmin() {
        this.router.navigate([`dashboard-admin/credenciados`]);
        this.verPerfilMode = false;
    }

    closeModal(id: string) {
        this.modalService.close(id);
        if (id === 'modal-validator-header' && this.cotacaoFlag === true) {
            this.openModal('modal-cotacao');
        }
        if (id === 'modal-validator-header' && this.passwordResetFlag === true) {
            this.openModal('modal-reset-password');
        }
    }

    // send user id, person type and token via route parameters to dashboard components and set dashboard mode
    enterDash(data, id) {
        this.loading = false;
        this.user = {
            id: data.user.id,
            personType: data.user.tipo_pessoa,
            token: data.token
        };
        window.localStorage.setItem('user_rede_credenciados', JSON.stringify(this.user));
        if (data.user.email_verified_at !== null && (data.user.admin === 0 || data.user.admin === '0')) {
            this.router.navigate([`dashboard/minhas-informacoes`]);
            this.dashboardMode = true;
            if (id) { this.modalService.close(id); }
        } else if (data.user.email_verified_at !== null && (data.user.admin === 1 || data.user.admin === '1')) {
            this.router.navigate([`dashboard-admin/credenciados`]);
            this.dashboardMode = true;
            this.adminMode = true;
            this.verPerfilMode = false;
            if (id) { this.modalService.close(id); }
        } else if (data.user.email_verified_at === null) {
            this.userIdEmailService.passEmailAndId(data.user.id, data.user.email);
            this.router.navigate([{ outlets: { verified: ['email-verified'] }}]);
        } else {
            this.router.navigate([{ outlets: { popup: ['compose'] }}]);
        }
    }

    // exit from dashboard component
    exit() {
        this.dashboardMode = false;
        this.adminMode = false;
        this.verPerfilMode = false;
        window.localStorage.clear();
        this.router.navigate(['/']);
    }

    forgetPassword(id) {
        this.modalService.close(id);
        this.router.navigate(['/forget-password-email']);
    }

    home() {
        this.router.navigate(['/']);
        this.verPerfilMode = true;
    }

    linkRoutes(linkName) {
        switch (linkName) {
            case 'Principal': {
                this.router.navigate(['/']);
                break;
            }
            case 'Quem Somos': {
                this.router.navigate(['/quem-somos']);
                break;
            }
            case 'Cadastre-se grátis': {
                this.router.navigate(['/register']);
                break;
            }
            case 'Solicitar cotações': {
                this.modalService.open('modal-cotacao');
                break;
            }
            case 'Currículos': {
                this.router.navigate(['/curriculum']);
                break;
            }
            case 'Anúncios': {
                this.router.navigate(['/anuncios']);
                break;
            }
            case 'Contato': {
                this.router.navigate(['/contato']);
                break;
            }
            default: {
                this.router.navigate(['/']);
                break;
            }
        }
    }

    minhasInformacoes() {
        this.router.navigate([`informacoes`]);
        this.verPerfilMode = !this.verPerfilMode;
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

    // sends cotacao data to api server
    onCotacaoFormSubmit() {
        if (this.cotacaoForm.valid && this.cityTags.length > 0 &&
            this.stateTags.length > 0) {
            this.loading = false;
            this.cotService.create({
                cidades: this.cityTags.toString(),
                estados: this.stateTags.toString(),
                nome: this.cotacaoForm.value.nome,
                email: this.cotacaoForm.value.email,
                tel: this.cotacaoForm.value.tel,
                cel: this.cotacaoForm.value.cel,
                mensagem: this.cotacaoForm.value.mensagem,
            }).subscribe(
                    () => {
                        this.cotacaoForm.reset();
                        this.router.navigate([{ outlets: { message: ['solicitation-message'] }}]);
                        this.loading = false;
                    },
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
            this.modalService.close('modal-cotacao');
        } else {
            this.passwordResetFlag = false;
            this.cotacaoFlag = true;
            this.modalService.close('modal-cotacao');
            this.openModal('modal-validator-header');
        }
    }

    // login service from server api
    onSubmit(id: string) {
        this.loading = true;
        this.loginService.login(this.loginForm.value)
            .subscribe(
                (data) => {
                    this.userPassword = this.loginForm.value.password;
                    this.userEmail = this.loginForm.value.email;
                    this.enterDash(data, id);
                },
                () => {
                    this.router.navigate([{ outlets: { popup: ['compose'] }}]);
                    this.loading = false;
                }
            );
    }

    onResetPasswordSubmit(id: string) {
        if (this.resetPasswordForm.valid) {
            if ((this.resetPasswordForm.value.password !==
                this.resetPasswordForm.value.newPassword) &&
                (this.resetPasswordForm.value.newPassword ===
                this.resetPasswordForm.value.newPasswordConfirmation)) {
                this.loading = true;
                this.loginService.resetPassword(this.user.id,
                  {
                      newPassword: this.resetPasswordForm.value.newPassword
                  },
                  this.user.token)
                    .subscribe(
                        () => {
                            this.resetPasswordForm.reset();
                            this.modalService.close(id);
                            this.loading = false;
                            this.router.navigate([{ outlets: { update: ['update-message'] }}]);
                        },
                        () => {
                            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                            this.loading = false;
                        }
                    );
            } else {
                this.router.navigate([{ outlets: { password: ['password-error'] }}]);
            }
        } else {
            this.cotacaoFlag = false;
            this.passwordResetFlag = true;
            this.closeModal('modal-reset-password');
            this.openModal('modal-validator-header');
        }
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    // method that populates cities div in Modal
    populateCities() {
        if (this.stateSelectedModal === undefined) {
            window.alert('Selecione um Estado');
        } else {
            const stateCode = CITYCODE[this.stateSelectedModal];
            if (stateCode) {
                this.loading = true;
                this.citiesService.getCities(stateCode).subscribe(
                        cities => {
                            cities.forEach(element => {
                                const el = element;
                                if (this.cities.length === 0) {
                                    this.cities.push(element);
                                } else if (this.cities.some(val => val.nome === el.nome)) {
                                    return;
                                } else {
                                    this.cities.push(element);
                                    this.cities.sort((a, b) => a.nome.localeCompare(b.nome));
                                }
                            });
                            this.loading = false;
                        },
                        () => {
                            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                            this.loading = false;
                        }
                    );
            }
        }
    }

    // remove state tag in Modal
    removeStateModal(state) {
        this.stateTags = this.stateTags.filter( val => val !== state);
        if (this.stateTags.length === 0) { this.stateSelectedModal = undefined; }
        this.removeCities(state);
    }

    removeCities(state) {
        const stateCode = CITYCODE[state];
        if (stateCode) {
            this.loading = true;
            this.citiesService.getCities(stateCode).subscribe(
                    cities => {
                        cities.forEach(element => {
                            this.cityTags = this.cityTags.filter(val => val !== element.nome);
                            this.cities = this.cities.filter(val => val.nome !== element.nome);
                        });
                        this.loading = false;
                    },
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
        }
    }

    // remove city tag in Modal
    removeCityModal(city) {
        this.cityTags = this.cityTags.filter( val => val !== city);
    }

    // method that populates cities div
    showCities() {
        if (this.stateSelectedModal === undefined) {
            window.alert('Selecione um Estado');
        } else {
            this.citiesShowModal = true;
            this.searchCity = '';
        }
    }

    showStatesModal() {
        this.statesShowModal = true;
    }

    // method that select a city
    selectCityModal(city) {
        this.cityClickedModal = city;
        this.citiesShowModal = false;
        this.searchCity = city;
        if (this.cityTags.includes(city) === false) {this.cityTags.push(city); }
    }

    // method that select a state
    selectStateModal(state) {
        this.stateClickedModal = state;
        this.stateSelectedModal = state;
        if (this.stateTags.includes(state) === false) {this.stateTags.push(state); }
        this.statesShowModal = false;
        this.populateCities();
    }

    // method that show jobs
    showJobs() {
        this.loading = true;
        this.activityService.all().subscribe(
                activityList => {
                    activityList.map(item => this.jobsFull.push(item));
                    this.loading = false;
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
        this.jobListShow = !this.jobListShow;
    }

    // method that select a job
    selectJob(job) {
        this.jobClicked = job;
        this.jobListShow = false;
    }
}
