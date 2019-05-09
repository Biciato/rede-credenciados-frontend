import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  template: `
    <section>
      <ul>
        <li [routerLink]="['/dashboard/minhas-informacoes']">
          <i class="far fa-user-circle"></i>Minhas Informações
        </li>
        <li [routerLink]="['/dashboard/minhas-unidades']"
          *ngIf="personType === 'pessoa_juridica'">
          <i class="fas fa-store-alt"></i>Minhas Unidades
        </li>
        <li [routerLink]="['/dashboard/indicar-amigo']">
          <i class="far fa-hand-point-right"></i>Indicar um amigo
        </li>
        <li [routerLink]="['/dashboard/minhas-propagandas']"
          *ngIf="personType === 'pessoa_juridica'">
          <i class="fas fa-ad"></i>Meus Anúncios
        </li>
        <li [routerLink]="['/dashboard/mensagens']">
          <i class="far fa-comments"></i>Mensagens</li>
        <li [routerLink]="['/dashboard/cotacoes']">
          <i class="fas fa-search-dollar"></i>Cotações Recebidas
        </li>
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
    // sets person type from local storage
    this.personType = JSON.parse(window.localStorage.getItem('user_rede_credenciados')).personType;
  }
}
