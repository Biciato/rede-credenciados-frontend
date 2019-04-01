import { Component, OnInit } from '@angular/core';

import { GoogleGeolocatorService } from './services/google-geolocator/google-geolocator.service';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <router-outlet name="message"></router-outlet>
    <router-outlet name="success"></router-outlet>
    <router-outlet name="update"></router-outlet>
    <router-outlet name="unidade"></router-outlet>
    <router-outlet name="propaganda"></router-outlet>
    <router-outlet name="newsletter"></router-outlet>
    <router-outlet name="arquivo"></router-outlet>
    <router-outlet name="error"></router-outlet>
    <router-outlet name="password"></router-outlet>
    <router-outlet name="verified"></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'Rede Credenciados';

    constructor(private googleService: GoogleGeolocatorService) {}

    ngOnInit() {
        this.googleService.locationLatLong().subscribe(
            data => this.googleService.cidade(data).subscribe()
        );
    }
}
