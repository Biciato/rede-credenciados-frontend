import { BannerService } from 'src/app/services/banner/banner.service';
import { GoogleGeolocatorService } from './../services/google-geolocator/google-geolocator.service';
import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ActivityService } from '../services/activity/activity.service';
import { CitiesService } from '../services/cities/cities.service';
import { CotacaoService } from '../services/cotacao/cotacao.service';
import { LoginService } from '../services/login/login.service';
import { ModalService } from '../services/modal/modal.service';
import { PesquisaClientesService } from '../services/pesquisa-clientes/pesquisa-clientes.service';

import { Atividade } from '../models/atividade';
import { CITYCODE } from '../models/city-code';
import { ABVR_ESTADO_INVERSO } from '../models/abreviacao-estados';
import { PesquisaCliente } from '../models/pesquisa-cliente';

import { environment } from '../../environments/environment';
import { AvatarService } from '../services/avatar/avatar.service';
import { PropagandaService } from '../services/propaganda/propaganda.service';

@Component({
    selector: 'app-section',
    templateUrl: 'section.component.html',
    styleUrls: ['section.component.scss']
})

export class SectionComponent {
    @Output() dashEnter = new EventEmitter<boolean>();

    atividadesPesquisa: Atividade[];
    avatar = '../../../assets/images/sem-foto.jpg';

    bannerImgSide1 = '../../assets/images/Banner-Promocional.gif';
    bannerImgSide2 = '../../assets/images/Banner-Promocional.gif';
    bannerImgSide3 = '../../assets/images/Banner-Promocional.gif';
    bannerImgSide4 = '../../assets/images/Banner-Promocional.gif';
    bannerImgSide5 = '../../assets/images/Banner-Promocional.gif';
    bannerImgTop1 = '../../assets/images/banner-top.jpg';
    bannerImgTop2 = '../../assets/images/banner-top.jpg';
    bannerImgTop3 = '../../assets/images/banner-top.jpg';
    baseUrlArquivos = environment.baseUrlArquivos;
    brStates: string[];

    citiesShow: boolean;
    citiesShowModal: boolean;
    cityClicked: string;
    cityClickedModal: string;
    cities: string[];
    cityTags: string[];

    errorMessage: string;

    jobsFull: Atividade[];
    jobListShow: boolean;
    jobClicked: Atividade;

    links: string[];
    loading = false;
    // initiating login form group
    loginForm = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
    });

    pesquisaFlag = false;
    propagandas = [];

    resized: boolean;

    searchResults: PesquisaCliente[];
    // initiating search form group
    searchCity: string;
    searchJob: string;
    stateClicked: string;
    stateSelected: string;
    stateClickedModal: string;
    stateSelectedModal: string;
    stateTags: string[];
    statesShow: boolean;
    statesShowModal: boolean;
    stateName: string;

    tipoPessoa = '';

    userIdsSide = [];
    userIdsTop = [];

    @HostListener('window:resize', ['$event']) onResize(event) {
        // remove map when width screen is less than 930px
        const innerWidth = window.innerWidth;
        if (innerWidth < 930) {
            this.resized = true;
        } else {
            this.resized = false;
        }
    }

    constructor(private activityService: ActivityService,
                private avatarService: AvatarService,
                private bannerService: BannerService,
                private citiesService: CitiesService,
                private googleService: GoogleGeolocatorService,
                private loginService: LoginService,
                private modalService: ModalService,
                private pesClientService: PesquisaClientesService,
                private propService: PropagandaService,
                private router: Router) {
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
        ];

        this.links = [
            'Principal',
            'Quem Somos',
            'Cadastre-se grátis',
            'Solicitar cotações',
            'Currículos',
            'Anúncios',
            'Contato'
        ];

        this.atividadesPesquisa = [];
        // initiating Arrays
        this.cities = [];
        this.cityTags = [];
        this.stateTags = [];
        // setting city label with initial value
        this.cityClicked = 'Selecione a cidade: ';
        // setting state label with initial value
        this.stateClicked = 'Selecione o Estado: ';
        this.activityService.all().subscribe(
                activityList => {
                    this.jobsFull = activityList;
                    this.loading = false;
                },
                () => this.loading = false
            );
        this.googleService.locationLatLong().subscribe(latLong => this.getCityState(latLong));
    }

    // method that hide jobs list
    clearJobDiv() {
        this.jobListShow = false;
    }

    // method that hide cities list
    clearCityDiv() {
        this.cities = [];
        this.citiesShow = false;
    }

    // method that hide cities list in Modal
    clearCityDivModal() {
        this.cities = [];
        this.citiesShowModal = false;
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    // sets header component dashboard mode through UIEvent call
    enterDash(data) {
        this.loading = false;
        this.loginForm.reset();
        const user = {
            id: data.user.id,
            token: data.user.token
        };
        window.localStorage.setItem('user_rede_credenciados', JSON.stringify(user));
        if (data.user.id && data.user.admin === 0 || data.user.admin === '0') {
            this.router.navigate(['dashboard/minhas-informacoes']);
            event = new UIEvent('reset');
            window.dispatchEvent(event);
        } else if (data.user.id && data.user.admin === 1 || data.user.admin === '1') {
            event = new UIEvent('reset');
            window.dispatchEvent(event);
            this.router.navigate([`dashboard-admin/credenciados`]);
        } else {
            this.router.navigate([{ outlets: { popup: ['compose'] }}]);
        }
    }

    getCityState(latLong) {
        this.googleService.cidade(latLong).subscribe((data) =>
            this.getPropIdx(
                data.results[0].address_components[3].long_name,
                data.results[0].address_components[4].long_name
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            ));
    }

    getPropIdx(cidade, estado) {
        this.propService.index(cidade, estado).subscribe(data => this.getUserPropIds(data));
    }

    getUserPropIds(data) {
        if (data[0].length === 1) {
            this.bannerService.showTop(data[0][0].user_id).subscribe(
                (img) => img.length > 0 ? this.bannerImgTop1 = this.baseUrlArquivos + img :
                    this.bannerImgTop1 = undefined,
                () => this.bannerImgTop1 = '../../assets/images/banner-top.jpg'
            );
        }
        if (data[0].length === 2) {
            data[0].forEach(el => this.userIdsTop.push(el.user_id));
            this.userIdsTop.forEach(el => {
                this.bannerService.showTop(el).subscribe(
                    (img) => {
                        if (this.userIdsTop.indexOf(el) === 0) {
                            img.length > 0 ? this.bannerImgTop1 = this.baseUrlArquivos + img :
                            this.bannerImgTop1 = undefined;
                        }
                        if (this.userIdsTop.indexOf(el) === 1) {
                            img.length > 0 ? this.bannerImgTop2 = this.baseUrlArquivos + img :
                            this.bannerImgTop2 = undefined;
                        }

                    },
                    () => this.bannerImgTop1 = '../../assets/images/banner-top.jpg'
                );
            });
        }
        if (data[0].length === 3) {
            data[0].forEach(el => this.userIdsTop.push(el.user_id));
            this.userIdsTop.forEach(el => {
                this.bannerService.showTop(el).subscribe(
                    (img) => {
                        if (this.userIdsTop.indexOf(el) === 0) {
                            img.length > 0 ? this.bannerImgTop1 = this.baseUrlArquivos + img :
                            this.bannerImgTop1 = undefined;
                        }
                        if (this.userIdsTop.indexOf(el) === 1) {
                            img.length > 0 ? this.bannerImgTop2 = this.baseUrlArquivos + img :
                            this.bannerImgTop2 = undefined;
                        }
                        if (this.userIdsTop.indexOf(el) === 2) {
                            img.length > 0 ? this.bannerImgTop3 = this.baseUrlArquivos + img :
                            this.bannerImgTop3 = undefined;
                        }
                    },
                    () => {
                        this.bannerImgTop1 = '../../assets/images/banner-top.jpg';
                        this.bannerImgTop2 = '../../assets/images/banner-top.jpg';
                        this.bannerImgTop3 = '../../assets/images/banner-top.jpg';
                    }
                );
            });
        }

        if (data[0].length > 3) {
            data[0].forEach(el => this.userIdsTop.push(el.user_id));
        }

        if (data[1].length === 1) {
            this.bannerService.showSide(data[0][0].user_id).subscribe(
                (img) => img.length > 0 ? this.bannerImgSide1 = this.baseUrlArquivos + img :
                    this.bannerImgSide1 = undefined,
                () => this.bannerImgSide1 = '../../../assets/images/sem-foto.jpg'
            );
        }
    }

    // check login data and gets token from api server
    loginSubmit() {
        this.loading = true;
        this.loginService.login(this.loginForm.value)
            .subscribe(data => this.enterDash(data),
                () => {
                    this.loading = false;
                    this.router.navigate([{ outlets: { popup: ['compose'] }}]);
                }
            );
    }

    // redirects user to unity selected informations
    maisInformacoesLink(pesquisa) {
        if (pesquisa.pessoa_fisica_id) {
            this.tipoPessoa = 'pessoa_fisica';
        } else {
            this.tipoPessoa = 'pessoa_juridica';
        }
        this.router.navigate([`informacoes`],
                {queryParams: {
                    id: pesquisa.pessoa_fisica_id || pesquisa.pessoa_juridica_id || pesquisa.unidade_id,
                    nome: pesquisa.nome || pesquisa.nome_fantasia,
                    rua: pesquisa.rua,
                    numero: pesquisa.numero,
                    complemento: pesquisa.complemento || '',
                    atividades: pesquisa.atividades,
                    tel: pesquisa.tel,
                    tel2: pesquisa.tel2,
                    cidade: pesquisa.cidade,
                    bairro: pesquisa.bairro,
                    email: pesquisa.email,
                    tipoPessoa: this.tipoPessoa,
                    user_id: pesquisa.user_id
                }});
    }

    newSearch() {
        this.pesquisaFlag = false;
        this.resized = false;
        this.cityClickedModal = undefined;
        this.stateClickedModal = undefined;
        this.jobClicked = undefined;
    }

    // method that update state name Obsevable coming from map component
    onGetStateName(stateName) {
        this.stateSelected = stateName;
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

    openModal(id: string) {
        this.modalService.open(id);
    }

    // remove state tag
    removeState(state) {
        const idx = this.stateTags.indexOf(state);
        this.stateTags.splice(idx);
    }

    // remove state tag in Modal
    removeStateModal(state) {
        const idx = this.stateTags.indexOf(state);
        this.stateTags.splice(idx);
    }

    // remove city tag
    removeCity(city) {
        const idx = this.cityTags.indexOf(city);
        this.cityTags.splice(idx);
    }

    // remove city tag in Modal
    removeCityModal(city) {
        const idx = this.cityTags.indexOf(city);
        this.cityTags.splice(idx);
    }

    // method that select a job
    selectJob(job) {
        this.jobClicked = job;
        this.jobListShow = false;
    }

    // method that select a city
    selectCity(city) {
        this.cityClicked = city;
        this.citiesShow = false;
        if (this.cityTags.includes(city) === false) {this.cityTags.push(city); }
        this.cities = [];
    }

    // method that select a city
    selectCityModal(city) {
        this.cityClickedModal = city;
        this.citiesShowModal = false;
        if (this.cityTags.includes(city) === false) {this.cityTags.push(city); }
        this.cities = [];
    }

    // method that select a state
    selectState(state) {
        this.stateClicked = state;
        this.stateSelected = state;
        if (this.stateTags.includes(state) === false) {this.stateTags.push(state); }
        this.statesShow = false;
    }

    // method that select a state
    selectStateModal(state) {
        this.stateClickedModal = state;
        this.stateSelectedModal = state;
        if (this.stateTags.includes(state) === false) {this.stateTags.push(state); }
        this.statesShowModal = false;
    }

    // method that show jobs
    showJobs() {
        this.loading = true;
        this.activityService.all().subscribe(
                activityList => {
                    activityList.map(item => this.jobsFull.push(item));
                    this.loading = false;
                },
                () => this.loading = false
            );
        this.jobListShow = !this.jobListShow;
    }

    // method that populates cities div
    showCities() {
        if (this.stateSelected === undefined) {
            window.alert('Selecione um Estado');
            } else {
            const stateCode = CITYCODE[this.stateSelected];
            this.loading = true;
            if (stateCode) {
                this.citiesService.getCities(stateCode).subscribe(cities =>
                    cities.forEach(element => {
                        this.cities.push(element),
                        this.citiesShow = true;
                        this.loading = false;
                    }),
                    error => this.errorMessage = error
                    );
            }
        }
    }

    // method that populates cities div in Modal
    showCitiesModal() {
        if (this.stateSelectedModal === undefined) {
            window.alert('Selecione um Estado');
            } else {
            const stateCode = CITYCODE[this.stateSelectedModal];
            if (stateCode) {
                this.loading = true;
                this.citiesService.getCities(stateCode).subscribe(
                        cities => {
                            cities.forEach(element => {
                                this.cities.push(element.nome),
                                this.citiesShowModal = true;
                                this.loading = false;
                            });
                            this.loading = false;
                        },
                        () => this.loading = false
                    );
            }
        }
    }

    // method that populates states div
    showStates() {
        this.statesShow = true;
    }

    showStatesModal() {
        this.statesShowModal = true;
    }

    // gets unities data from search form
    searchServices() {
        if (this.stateSelected && this.cityClicked && this.jobClicked) {
            this.resized = true;
            this.loading = true;
            this.pesClientService.pesquisa({
                cidade: this.cityClicked,
                estado: ABVR_ESTADO_INVERSO[this.stateSelected],
                atividade: this.jobClicked.atividade
            }).subscribe(
                data => {
                    this.setAtividades(data);
                    this.loading = false;
                    },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                });
        }
    }

    // takes activities from string and create an array from that
    setAtividades(data) {
        this.searchResults = [];
        data.forEach(itemArr1 => itemArr1.forEach(item => {
                this.searchResults.push(item);
                if (item.unidade_id) {
                    this.avatarService.showUnidadeAvatar(item.user_id, item.unidade_id).subscribe(
                        (avatar) => {
                            avatar.length > 0 ? item.avatar = this.baseUrlArquivos + avatar :
                            this.avatar = '../../../assets/images/sem-foto.jpg';
                            this.loading = false;
                        },
                        () => {
                            this.avatar = '../../../assets/images/sem-foto.jpg';
                            this.loading = false;
                        }
                    );
                } else {
                    this.avatarService.show(item.user_id).subscribe(
                        (avatar) => {
                            avatar.length > 0 ? item.avatar = this.baseUrlArquivos + avatar :
                            this.avatar = '../../../assets/images/sem-foto.jpg';
                            this.loading = false;
                        },
                        () => {
                            this.avatar = '../../../assets/images/sem-foto.jpg';
                            this.loading = false;
                        }
                    );
                }
            }));
        this.pesquisaFlag = true;
    }
}

