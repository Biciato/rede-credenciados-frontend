import {Component, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

import { TO_RECEIVE_MOCK_DATA } from './to-receive-mock-data';

export interface ToReceiveData {
  nTitulo: string;
  situacao: string;
  formPgto: string;
  titular: string;
  vencimento: Date;
  pagamento: Date;
  referente: string;
  original: number;
  acrescimo: number;
  decrescimo: number;
}

@Component({
  selector: 'app-to-receive',
  templateUrl: './to-receive.component.html',
  styleUrls: ['./to-receive.component.scss']
})
export class ToReceiveComponent {
  displayedColumns: string[] = ['nTitulo', 'situacao', 'formPgto', 'titular',
    'vencimento', 'pagamento', 'referente', 'original', 'acrescimo',
    'decrescimo', 'total'];
  dataSource: MatTableDataSource<ToReceiveData>;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router: Router
  ) {
    this.loading = true;
    this.applyPaginator();
  }

  applyPaginator() {
    this.dataSource = new MatTableDataSource(TO_RECEIVE_MOCK_DATA)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loading = false;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalRow(row) { return row.original + row.acrescimo - row.decrescimo; }
  getTotalColumn() {
    let total = 0;
    TO_RECEIVE_MOCK_DATA.forEach(val => {
      total = total + val.original + val.acrescimo - val.decrescimo;
    });
    return total;
  }
}
