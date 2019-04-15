import { CitiesService } from './../services/cities/cities.service';
import { CEPService } from 'src/app/services/cep/cep.service';
import { ModalService } from './../services/modal/modal.service';
import { Component, OnInit, NgZone } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CITYCODE } from '../models/city-code';
import { ABVR_ESTADO } from '../models/abreviacao-estados';
import { RegisterService } from '../services/register/register.service';
import { PropagandaService } from '../services/propaganda/propaganda.service';
import { BannerService } from '../services/banner/banner.service';
import { PagseguroService } from '../services/pagseguro/pagseguro.service';

declare let PagSeguroLightbox: any;

@Component({
    selector: 'app-anuncios',
    templateUrl: 'anuncios.component.html',
    styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {
    bannerFlag = false;
    bannerTypeFlag = false;
    brStates = [
        'RJ', 'RO', 'AC', 'AM', 'RR', 'PA', 'TO',
        'AP', 'MA', 'PI', 'CE', 'RN', 'PB', 'PE',
        'AL', 'SE', 'BA', 'MG', 'ES', 'SP', 'PR',
        'SC', 'RS', 'MS', 'GO', 'MT', 'DF'
    ].sort();
    cities = [];
    cityQty: any;
    cityTags = [];
    citiesShowModal = false;
    loading = false;
    imageName: string;
    itemPrice1: string;
    itemId: string;
    registerFlag = false;
    registerForm = this.fb.group({
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        tel: ['', Validators.required],
        rua: ['', Validators.required],
        bairro: ['', Validators.required],
        cep: ['', Validators.required],
        numero: ['', Validators.required],
        complemento: [''],
        cidade: ['', Validators.required],
        estado: ['', Validators.required]
    });
    searchCity: string;
    showStates = false;
    statesShowModal = false;
    stateClickedModal: string;
    stateQty: any;
    stateTags = [];
    side: string;

    constructor(
        private bannerService: BannerService,
        private cepService: CEPService,
        private citiesService: CitiesService,
        private fb: FormBuilder,
        private modalService: ModalService,
        private ngZone: NgZone,
        private pagService: PagseguroService,
        private propService: PropagandaService,
        private regService: RegisterService,
        private router: Router
    ) { }

    get f() { return this.registerForm.controls; }

    ngOnInit() {
    }

    closeModal(id: string) {
        this.modalService.close(id);
        if (id === 'modal-pagseguro-success') { this.router.navigate(['/']); }
    }

    checkout() {
        const data = {
            itemId1: this.itemId,
            itemPrice1: this.itemPrice1
        };
        this.pagService.checkout(data).subscribe(
            (transaction: any) => this.lightbox(transaction)
        );
    }

    chooseBanner() {
        document.getElementById('banner').click();
    }

    createProp(user) {
        let propaganda;
        this.side === 'topo' ? propaganda = {
                estados_topo: this.stateTags.toString(), cidades_topo: this.cityTags.toString()
            } : propaganda = {
                estados_lateral: this.stateTags.toString(), cidades_lateral: this.cityTags.toString()
            };
        this.propService.createPropUser(user.id, propaganda).subscribe(_ => this.uploadBanner(user),
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
        });
    }

    fileEvent(event) {
        this.imageName = event.target.files[0].name;
    }

    lightbox(code) {
        this.loading = false;
        PagSeguroLightbox(code, {
            success: () => this.openModal('modal-pagseguro-success'),
            abort: () => this.ngZone.run(() => this.router.navigate([{ outlets: { error: ['error-message'] }}]))
        });
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
                        this.setValuesAddressFields(data);
                        this.loading = false;
                    },
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
        }
    }

    onSubmit() {
        const banner = document.getElementById('banner') as HTMLInputElement;
        if (this.registerForm.valid &&
            (this.cityTags.length > 0) &&
            (this.stateTags.length > 0) &&
            banner.files[0]) {
            if (banner.files[0].type !== 'image/jpeg') {
                this.bannerTypeFlag = true;
                this.openModal('modal-validator');
            } else {
                this.loading = true;
                this.regService.registerUserPropaganda(this.registerForm.value)
                    .subscribe(user => this.createProp(user),
                    () => {
                            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                            this.loading = false;
                    });
            }
        } else {
            if (!banner.files[0]) {
                this.bannerFlag = true;
            } else if (banner.files[0].type !== 'image/jpeg') {
                this.bannerFlag = false;
                this.bannerTypeFlag = true;
            }
            this.openModal('modal-validator');
        }
    }

    openModal(id: string) {
        this.modalService.open(id);
    }

    populateCities() {
        if (this.stateClickedModal === undefined) {
            window.alert('Selecione um Estado');
        } else {
            const stateCode = CITYCODE[this.stateClickedModal];
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

    removeCities(state) {
        const stateCode = CITYCODE[state];
        if (stateCode) {
            this.loading = true;
            this.citiesService.getCities(stateCode).subscribe(
                cities => {
                    cities.forEach(element => {
                        this.cities = this.cities.filter(val => val.nome !== element.nome);
                        this.cityTags = this.cityTags.filter( val => val !== element.nome);
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

    removeCityModal(city) {
        this.cityTags = this.cityTags.filter( val => val !== city);
    }

    removeStateModal(state) {
        this.stateTags = this.stateTags.filter( val => val !== state);
        if (this.stateTags.length === 0) { this.stateClickedModal = undefined; }
        this.removeCities(state);
    }

    selectCityModal(city) {
        if (this.cities.filter( el => el.nome === city).length === 1) {
            this.citiesShowModal = false;
            this.searchCity = city;
            if (this.cityTags.includes(city) === false) {this.cityTags.push(city); }
        }
    }

    selectState(state) {
        this.registerForm.patchValue({ estado: state});
        this.showStates = false;
    }

    selectStateTag(state) {
        this.stateClickedModal = ABVR_ESTADO[state];
        if (this.stateTags.includes(this.stateClickedModal) === false) {
            this.stateTags.push(this.stateClickedModal);
        }
        this.statesShowModal = false;
        this.populateCities();
    }

    setValuesAddressFields(endereco) {
        this.registerForm.patchValue({
            rua: endereco.logradouro || '',
            bairro: endereco.bairro || '',
            cidade: endereco.localidade || '',
            estado: endereco.uf || '',
        });
    }

    setQtySideAndRegister(itemPrice, itemId, stateQty, cityQty, side) {
        this.itemPrice1 = itemPrice;
        this.itemId = itemId;
        this.cityQty = cityQty;
        this.stateQty = stateQty;
        this.side = side;
        this.registerFlag = true;
    }

    showCities() {
        if (this.stateClickedModal === undefined) {
            window.alert('Selecione um Estado');
        } else {
            this.citiesShowModal = true;
            this.searchCity = '';
        }
    }

    showStatesModal() {
        this.statesShowModal = true;
    }

    uploadBanner(user) {
        const banner = document.getElementById('banner') as HTMLInputElement;
        const formData = new FormData();
        formData.append('banner', banner.files[0]);
        this.bannerService.storeSimpleUserBanner(formData, user.id, banner.files[0].name,
            this.side).subscribe(
                _ => this.checkout(),
                () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
        });
    }
}
