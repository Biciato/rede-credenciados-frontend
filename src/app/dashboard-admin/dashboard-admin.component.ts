import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard-admin',
    template: `
        <app-sidenav-admin></app-sidenav-admin>
        <router-outlet></router-outlet>
    `,
    styles: [':host {display: flex;}']
})

export class DashboardAdminComponent {
    constructor(private router: Router) {
        if (!window.localStorage.user_rede_credenciados) {
            this.router.navigate(['/']);
        }
    }
}
