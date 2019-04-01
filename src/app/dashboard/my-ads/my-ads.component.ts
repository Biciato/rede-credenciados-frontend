import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CitiesService } from '../../services/cities/cities.service';
import { ModalService } from '../../services/modal/modal.service';
import { PessoaJuridicaService } from '../../services/pessoa-juridica/pessoa-juridica.service';
import { PropagandaService } from '../../services/propaganda/propaganda.service';
// import { UnityService } from '../../services/unity/unity.service';

import { CITYCODE } from '../../models/city-code';
// import { Unidade } from '../../models/unidade';
import { PessoaJuridica } from '../../models/pessoa-juridica';
import { Propaganda } from '../../models/propaganda';
import { BannerService } from 'src/app/services/banner/banner.service';

import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-my-ads',
    templateUrl: 'my-ads.component.html',
    styleUrls: ['my-ads.component.scss']
})

export class MyAdsComponent implements OnInit {
    bannerImageSide: string; // = '../../../assets/images/sem-foto.jpg';
    bannerImageTop: string; // = '../../../assets/images/sem-foto.jpg';
    baseUrlArquivos = environment.baseUrlArquivos;
    brStates: string[];

    citiesShow: boolean;
    citiesShowModal: boolean;
    cityClicked: string;
    cityClickedModal: string;
    cities: any;
    cityTags: string[];
    cidadesLateral = [];
    cidadesTopo = [];
    cityQty: number;

    estadosLateral = [];
    estadosTopo = [];
    editAdClicked: boolean;
    editMode: boolean;

    hasAd = false;

    imageName: string;

    loading: boolean;
    local: string;

    pessoaJuridica: PessoaJuridica;
    propagandaPj: Propaganda;

    searchText: string;
    stateClicked: string;
    stateSelected: string;
    stateClickedModal: string;
    stateSelectedModal: string;
    stateTags: string[];
    statesShow: boolean;
    statesShowModal: boolean;
    stateName: string;
    stateQty: number;

    user: any;

    constructor(
        private bannerService: BannerService,
        private citiesService: CitiesService,
        private modalService: ModalService,
        private propService: PropagandaService,
        private router: Router
        // private unidService: UnityService
    ) {
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
        this.brStates.sort();
        this.cities = [];
        this.editAdClicked = false;
        this.cities = [];
        this.cityTags = [];
        this.stateTags = [];
        // setting city label with initial value
        this.cityClicked = 'Selecione a cidade: ';
        // setting state label with initial value
        this.stateClicked = 'Selecione o Estado: ';
    }

    ngOnInit() {

        this.user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
        this.propService.showPropPJ(this.user.id, this.user.token)
            .subscribe(
                propaganda => {
                    this.propagandaPj = propaganda;
                    this.populatesStatesAndCities();
                },
                () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            });
        this.bannerService.showTop(this.user.id).subscribe(
                (data) => data.length > 0 ? this.bannerImageTop = this.baseUrlArquivos + data :
                    this.bannerImageTop = undefined,
                () => this.bannerImageTop = '../../../assets/images/sem-foto.jpg'
            );
        this.bannerService.showSide(this.user.id).subscribe(
                (data) => data.length > 0 ? this.bannerImageSide = this.baseUrlArquivos + data :
                    this.bannerImageSide = undefined,
                () => this.bannerImageSide = '../../../assets/images/sem-foto.jpg'
            );
    }

    backward(id, id2) {
        this.modalService.close(id);
        this.modalService.open(id2);
    }

    createPropagnada(stateQty, cityQty?, local?) {
        if (stateQty === 'todos') {
            this.modalService.open('modal-propaganda-banner');
        } else {
            this.stateQty = stateQty;
            this.cityQty = cityQty;
            this.local = local;
            this.modalService.open('modal-propaganda-estados');
        }
    }

    // triggers input click after user selects a file from his files
    chooseBanner() {
        document.getElementById('banner').click();
    }

    chooseBannerFromUpdate(local) {
        document.getElementById('bannerUpdate').click();
        this.local = local;
    }

    // method that hide cities list in Modal
    clearCityDivModal() {
        this.citiesShowModal = false;
    }

    closeModal(id: string) {
        this.modalService.close(id);
    }

    // show edit section
    editAd(id?) {
        this.editAdClicked = !this.editAdClicked;
        if (id) { this.modalService.close(id); }
        this.editMode = true;
    }

    fileEvent(event) {
        this.imageName = event.target.files[0].name;
    }

    getBannersImgs() {
        this.bannerService.showTop(this.user.id).subscribe(
                (data) => data.length > 0 ? this.bannerImageTop = this.baseUrlArquivos + data :
                    this.bannerImageTop = undefined,
                () => this.bannerImageTop = '../../../assets/images/sem-foto.jpg'
            );
        this.bannerService.showSide(this.user.id).subscribe(
                (data) => data.length > 0 ? this.bannerImageSide = this.baseUrlArquivos + data :
                    this.bannerImageSide = undefined,
                () => this.bannerImageSide = '../../../assets/images/sem-foto.jpg'
            );
    }

    includeCity() {
        if (this.cityClickedModal !== undefined) {
            if (this.cityTags.includes(this.cityClickedModal) === false) {
                this.cityTags.push(this.cityClickedModal);
            }
        }
    }

    /* get unities that belongs to pjs
    getUnidades(pj) {
        this.pessoaJuridica = pj;
        this.unidService.list(this.pessoaJuridica.id, this.token)
            .subscribe(unidades => this.unidades = unidades);
    } */

    nextModalCidades(id) {
        this.modalService.close(id);
        this.modalService.open('modal-propaganda-cidades');
    }

    nextModalBanner(id) {
        this.modalService.close(id);
        this.modalService.open('modal-propaganda-banner');
    }

    openModal(id) {
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
                                this.cities.push(element),
                                this.loading = false;
                            });
                            this.cities.sort();
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

    populatesStatesAndCities() {
        if (this.propagandaPj.estados_topo) { this.estadosTopo = this.propagandaPj.estados_topo.split(','); }
        if (this.propagandaPj.cidades_topo) { this.cidadesTopo = this.propagandaPj.cidades_topo.split(','); }
        if (this.propagandaPj.estados_lateral) {
            this.estadosLateral = this.propagandaPj.estados_lateral.split(',');
        }
        if (this.propagandaPj.cidades_lateral) {
            this.cidadesLateral = this.propagandaPj.cidades_lateral.split(',');
        }
        this.loading = false;
    }

    // remove city tag in Modal
    removeCityModal(city) {
        const idx = this.cityTags.indexOf(city);
        this.cityTags.splice(idx);
    }

    removeCities(state) {
        const stateCode = CITYCODE[state];
        if (stateCode) {
            this.loading = true;
            this.citiesService.getCities(stateCode).subscribe(
                    cities => {
                        cities.forEach(element => {
                            const idx = this.cities.indexOf(element);
                            this.cities.splice(idx, 1);
                            this.loading = false;
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

    // remove state tag in Modal
    removeStateModal(state) {
        const el = this.stateTags.indexOf(state);
        this.stateTags.splice(el, 1);
        this.removeCities(state);
    }

    // save ads on server
    save() {
        const banner = document.getElementById('banner') as HTMLInputElement;
        if (!banner.files[0]) {
            this.modalService.open('modal-aviso-imagem');

            return;

        } else if (banner.files[0].type !== 'image/jpeg') {
            this.modalService.open('modal-aviso-imagem');

            return;
        }
        let propaganda = {};
        if (this.local === 'topo') {
            propaganda = {
                estados_topo: this.stateTags.toString(),
                cidades_topo: this.cityTags.toString()
            };
        }
        if (this.local === 'lateral') {
            propaganda = {
                estados_lateral: this.stateTags.toString(),
                cidades_lateral: this.cityTags.toString()
            };
        }
        // if (this.unitySelected === this.pessoaJuridica.nome_fantasia) {
        if (this.propagandaPj.id) {
            this.propService.updatePropPJ(this.user.id, propaganda, this.user.token)
                .subscribe(
                    () => this.uploadBanner(),
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
        } else {
            this.propService.createPropPJ(this.user.id, propaganda, this.user.token)
                .subscribe(
                    () => this.uploadBanner(),
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
        }
        /* }  else {
            if (this.propagandaUnidade) {
                this.propService.updatePropUni(this.propagandaUnidade.id, propaganda, this.token)
                    .subscribe(() => this.router.navigate([{ outlets: { update: ['update-message'] }}]));
            } else {
                this.propService.createPropUni(this.unidadeSelecId, propaganda, this.token)
                    .subscribe(() => this.router.navigate([{ outlets: { propaganda: ['register-propaganda'] }}]));
            }
        } */
    }

    // method that select a city
    selectCityModal(city) {
        this.cityClickedModal = city.nome;
        this.citiesShowModal = false;
    }

    // method that select a state
    selectStateModal(state) {
        this.stateClickedModal = state;
        this.stateSelectedModal = state;
        if (this.stateTags.includes(state) === false) {
            this.stateTags.push(state);
            this.populateCities();
        }
        this.statesShowModal = false;
    }

    // show Ads details in modal
    showPropPJDetails(id: string, unity) {
        this.hasAd = false;
        // this.unitySelected = unity.target.innerHTML;
        // this.modalService.open(id);
        this.propService.showPropPJ(this.pessoaJuridica.id, this.user.token)
            .subscribe(propaganda => this.propagandaPj = propaganda);
    }

    showCities() {
        this.citiesShowModal = true;
    }

    showStatesModal() {
        this.statesShowModal = true;
    }

    // send img file to server
    uploadBanner() {
        this.loading = true;
        const banner = document.getElementById('banner') as HTMLInputElement;
        const formData = new FormData();
        formData.append('banner', banner.files[0]);
        this.bannerService.store(formData, this.user.id, banner.files[0].name,
            this.local, this.user.token)
            .subscribe(
                () => {
                    this.loading = false;
                    this.modalService.close('modal-propaganda-banner');
                    this.propService.showPropPJ(this.user.id, this.user.token)
                        .subscribe(
                            propaganda => {
                                this.propagandaPj = propaganda;
                                this.populatesStatesAndCities();
                            },
                            () => {
                            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                            this.loading = false;
                        });
                    this.getBannersImgs();
                    this.router.navigate([{ outlets: { update: ['update-message'] }}]);
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }

    updateBanner() {
        const banner = document.getElementById('bannerUpdate') as HTMLInputElement;
        if (banner.files[0].type !== 'image/jpeg') {
            this.modalService.open('modal-aviso-imagem');

            return;
        }
        const formData = new FormData();
        formData.append('banner', banner.files[0]);
        this.loading = true;
        this.bannerService.store(formData, this.user.id, banner.files[0].name,
            this.local, this.user.token)
            .subscribe(
                () => {
                    this.loading = false;
                    this.modalService.close('modal-propaganda-banner');
                    this.propService.showPropPJ(this.user.id, this.user.token)
                        .subscribe(
                            propaganda => {
                                this.propagandaPj = propaganda;
                                this.populatesStatesAndCities();
                            },
                            () => {
                            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                            this.loading = false;
                        });
                    this.getBannersImgs();
                    this.router.navigate([{ outlets: { update: ['update-message'] }}]);
                },
                () => {
                    this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                    this.loading = false;
                }
            );
    }
}
