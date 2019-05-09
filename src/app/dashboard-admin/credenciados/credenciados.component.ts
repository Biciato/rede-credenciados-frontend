import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { CredenciadosService } from '../../services/credenciados/credenciado.service';

export interface UsersData {
  atividade: string;
}

@Component({
    selector: 'app-credenciados',
    templateUrl: 'credenciados.component.html',
    styleUrls: ['credenciados.component.scss']
})

export class CredenciadosComponent implements OnInit {
  displayedColumns: string[] = ['status', 'personType', 'name',
    'fantasyName', 'city', 'tel', 'tel2', 'cel', 'email', 'delete'];
  dataSource: MatTableDataSource<UsersData>;
  loading = false;
  token: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private credService: CredenciadosService, private router: Router) { }

  ngOnInit() {
    this.token = JSON.parse(window.localStorage.getItem('user_rede_credenciados')).token;
    this.getCredenciados();
  }

  applyPaginator(credenciados) {
    this.loading = false;
    this.dataSource = new MatTableDataSource(credenciados)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCredenciado(credenciado) {
    this.loading = true;
    this.credService.delete(credenciado.id, this.token).subscribe(
      _ => {
        this.router.navigate([{ outlets: { update: ['update-message'] }}]);
        this.getCredenciados();
      },
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
        this.applyPaginator(credenciados);
        this.loading = false;
      },
      () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      }
    );
  }
}
