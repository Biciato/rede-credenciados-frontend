import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CredenciadosService } from '../../services/credenciados/credenciado.service';

import { Credenciado } from '../../models/credenciado';

@Component({
    selector: 'app-credenciados',
    templateUrl: 'credenciados.component.html',
    styleUrls: ['credenciados.component.scss']
})

export class CredenciadosComponent implements OnInit {
    credenciado: Credenciado;
    credenciados: Credenciado[];
    loading = false;
    p = 1;
    searchText: string;
    token: string;

    constructor(private credService: CredenciadosService, private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.token = JSON.parse(window.localStorage.getItem('user_rede_credenciados')).token;
        this.getCredenciados();
    }

    deleteCredenciado(credenciado) {
        this.loading = true;
        this.credService.delete(credenciado.id, this.token).subscribe(
            () => { this.getCredenciados(); this.loading = false; },
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }

    getCredenciados() {
        this.loading = true;
        this.credService.index().subscribe(
            credenciados => {
                this.credenciados = credenciados;
                this.loading = false;
            },
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }
}
