import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidenav-admin',
    template: `
        <section>
            <!-- Links Sidenav List -->
            <ul>
                <li (click)="credenciadosRoute()"><i class="fas fa-users"></i>Credenciados</li>
                <li (click)="slideShowRoutes()"><i class="far fa-image"></i>Slide Show</li>
                <li (click)="especialidadesRoute()"><i class="fas fa-stethoscope"></i>Especialidades</li>
                <li (click)="newsLetterRoutes()"><i class="fas fa-paper-plane"></i>Newsletter</li>
            </ul>
        </section>
    `,
    styleUrls: ['sidenav-admin.component.scss']
})

export class SidenavAdminComponent {

    constructor(private router: Router) {}

    // pass token
    credenciadosRoute() {
        this.router.navigate([`dashboard-admin/credenciados`]);
    }

    // pass token
    slideShowRoutes() {
        this.router.navigate([`dashboard-admin/slide-show`]);
    }

    // pass token
    especialidadesRoute() {
        this.router.navigate([`dashboard-admin/especialidades`]);
    }

    // pass token
    newsLetterRoutes() {
        this.router.navigate([`dashboard-admin/newsletter`]);
    }
}
