import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
    selector: 'app-sidenav',
    template: `
        <section>
            <!-- Links Sidenav List -->
            <ul>
                <li (click)="userInformationRoute()">
                    <i class="far fa-user-circle"></i>Minhas Informações</li>
                <li (click)="unityInformationRoute()" *ngIf="personType === 'pessoa_juridica'">
                    <i class="fas fa-store-alt"></i>Minhas Unidades</li>
                <li routerLink="/dashboard/indicar-amigo" routerLinkActive="active">
                    <i class="far fa-hand-point-right"></i>Indicar um amigo</li>
                <li (click)="myAdsRoute()" *ngIf="personType === 'pessoa_juridica'">
                    <i class="fas fa-ad"></i>Meus Anúncios</li>
                <li (click)="msgRoute()">
                    <i class="far fa-comments"></i>Mensagens</li>
                <li (click)="cotacoesRoute()">
                    <i class="fas fa-search-dollar"></i>Cotações Recebidas</li>
            </ul>
        </section>
    `,
    styleUrls: ['sidenav.component.scss']
})

export class SidenavComponent implements OnInit {
    email: Observable<string>;
    personType: string;

    constructor(private route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        // sets person type, user id and token from route parameters
        const user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
        this.personType = user.personType;
    }

    // pass user id, token and person type to user-information component
    userInformationRoute() {
        this.router.navigate([`dashboard/minhas-informacoes`]);
    }

    // pass user id, token to unity-information component
    unityInformationRoute() {
        this.router.navigate([`dashboard/minhas-unidades`]);
    }

    // pass user id, token to my-ads component
    myAdsRoute() {
        this.router.navigate([`dashboard/minhas-propagandas`]);
    }

    // pass user id, token to messages component
    msgRoute() {
        this.router.navigate([`dashboard/mensagens`]);
    }

    // pass user id, token and person type to cotacoes component
    cotacoesRoute() {
        this.router.navigate([`dashboard/cotacoes`]);
    }
}
