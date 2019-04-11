import { CitiesService } from './../services/cities/cities.service';
import { CEPService } from 'src/app/services/cep/cep.service';
import { ModalService } from './../services/modal/modal.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare let PagSeguroLightbox: any;

@Component({
    selector: 'app-anuncios',
    templateUrl: 'anuncios.component.html',
    styleUrls: ['./anuncios.component.scss']
})
export class AnunciosComponent implements OnInit {
    brStates = [
        'RJ',
        'RO',
        'AC',
        'AM',
        'RR',
        'PA',
        'TO',
        'AP',
        'MA',
        'PI',
        'CE',
        'RN',
        'PB',
        'PE',
        'AL',
        'SE',
        'BA',
        'MG',
        'ES',
        'SP',
        'PR',
        'SC',
        'RS',
        'MS',
        'GO',
        'MT',
        'DF'
    ].sort();
    cities: any[];
    cityTags: string[];
    citiesShowModal = false;
    loading = false;
    quantity: number | string;
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
    stateTags: string[];
    side: string;

    constructor(
        private cepService: CEPService,
        private citiesService: CitiesService,
        private fb: FormBuilder,
        private modalService: ModalService,
        private router: Router
    ) { }

    get f() { return this.registerForm.controls; }

    ngOnInit() {
    }

    closeModal(id: string) {
        this.modalService.close(id);
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

    }

    removeCityModal() {

    }

    removeStateModal(state) {
        this.stateTags = this.stateTags.filter( val => val !== state);
        if (this.stateTags.length === 0) { this.stateClickedModal = undefined; }
        this.removeCities(state);
    }

    selectCityModal(city) {
        this.citiesShowModal = false;
        this.searchCity = city;
        if (this.cityTags.includes(city) === false) {this.cityTags.push(city); }
    }

    selectState(state) {
        this.registerForm.patchValue({ estado: state});
        this.showStates = false;
    }

    selectStateTag(state) {
        this.stateClickedModal = state;
        if (this.stateTags.includes(state) === false) {this.stateTags.push(state); }
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

    setQtySideAndRegister(qty, side) {
        this.quantity = qty;
        this.side = side;
        this.registerFlag = true;
    }

    showCities() {

    }

    showStatesModal() {

    }
}
