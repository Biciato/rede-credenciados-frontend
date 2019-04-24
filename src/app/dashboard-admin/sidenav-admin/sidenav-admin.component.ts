import { Component } from '@angular/core';

@Component({
    selector: 'app-sidenav-admin',
    template: `
        <section>
            <!-- Links Sidenav List -->
            <ul>
                <li [routerLink]="['/dashboard-admin/resumo']"><i class="fas fa-chart-bar"></i>Resume</li>
                <li [routerLink]="['/dashboard-admin/minhas-informações']"><i class="fas fa-user"></i>Minhas Informações</li>
                <li [routerLink]="['/dashboard-admin/clientes']"><i class="fas fa-users"></i>Clientes</li>
                <li [routerLink]="['/dashboard-admin/credenciados']"><i class="fas fa-id-card-alt"></i>Credenciados</li>
                <li [routerLink]="['/dashboard-admin/slide-show']"><i class="far fa-image"></i>Slide Show</li>
                <li [routerLink]="['/dashboard-admin/especialidades']"><i class="fas fa-stethoscope"></i>Especialidades</li>
                <li [routerLink]="['/dashboard-admin/newsletter']"><i class="fas fa-paper-plane"></i>Newsletter</li>
                <li [routerLink]="['/dashboard-admin/resumo-indicação']"><i class="far fa-hand-point-up"></i>Resumo Indicações</li>
                <li [routerLink]="['/dashboard-admin/financeiro']"><i class="fas fa-dollar-sign"></i>Financeiro</li>
                <li [routerLink]="['/dashboard-admin/mensagens']"><i class="fas fa-comments"></i>Mensagens</li>
                <li [routerLink]="['/dashboard-admin/comunicação']"><i class="fas fa-phone-volume"></i>Comunicação</li>
            </ul>
        </section>
    `,
    styleUrls: ['sidenav-admin.component.scss']
})

export class SidenavAdminComponent {

    constructor() {}

}
