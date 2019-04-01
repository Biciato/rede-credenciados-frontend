import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    template: `
        <app-sidenav></app-sidenav>
        <router-outlet></router-outlet>
    `,
    styles: [':host {display: flex;}']
})

export class DashboardComponent {
    constructor(private router: Router) {
        if (!window.localStorage.user_rede_credenciados) {
            this.router.navigate(['/']);
        }
    }
}
