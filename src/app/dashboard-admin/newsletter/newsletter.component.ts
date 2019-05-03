import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { NewsletterService } from '../../services/newsletter/newsletter.service';

import { Newsletter } from '../../models/newsletter';

export interface NewsletterData {
  nome: string;
  email: string;
  created_at: Date;
}

@Component({
    selector: 'app-newsletter',
    templateUrl: 'newsletter.component.html',
    styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
    displayedColumns: string[] = ['name', 'email', 'date',
      'delete'];
    dataSource: MatTableDataSource<NewsletterData>;

    loading = false;

    newsletters: Newsletter[];

    token: string;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
      private newService: NewsletterService,
      private router: Router
    ) { }

    ngOnInit() {
      // getting token from route parameters and pj and activities from server
      this.token = JSON.parse(window.localStorage.getItem('user_rede_credenciados')).token;
      this.getNewsletter();
    }

    applyPaginator(news) {
      this.loading = false;
      this.dataSource = new MatTableDataSource(news)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    getNewsletter() {
      this.loading = true;
      this.newService.index(this.token).subscribe(
        news => {
          this.applyPaginator(news);
          this.loading = false;
        },
        () => {
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
        });
    }

    deleteNewsletter(newsletter) {
      this.loading = true;
      this.newService.delete(newsletter.id, this.token).subscribe(
        _ => {
          this.router.navigate([{ outlets: { update: ['update-message'] }}]);
          this.getNewsletter();
        },
        () => {
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
        }
      );
    }

}
