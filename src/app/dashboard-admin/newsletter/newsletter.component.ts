import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { NewsletterService } from '../../services/newsletter/newsletter.service';

import { Newsletter } from '../../models/newsletter';

@Component({
    selector: 'app-newsletter',
    templateUrl: 'newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {

    loading = false;

    newsletters: Newsletter[];

    p = 1;

    searchText: string;

    token: string;

    constructor(private newService: NewsletterService, private router: Router,
                private route: ActivatedRoute) { }

    ngOnInit() {
        // getting token from route parameters and pj and activities from server
        this.token = JSON.parse(window.localStorage.getItem('user_rede_credenciados')).token;
        this.getNewsletter();
    }

    getNewsletter() {
        this.loading = true;
        this.newService.index(this.token).subscribe(
            news => { this.newsletters = news; this.loading = false; },
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            });
    }

    deleteNewsletter(newsletter) {
        this.loading = true;
        this.newService.delete(newsletter.id, this.token).subscribe(
            () => this.getNewsletter(),
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }

}
