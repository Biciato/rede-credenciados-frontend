import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { TO_PAY_MOCK_DATA } from './to-pay-mock-data';

export interface ToPayData {
  nTitulo: string;
  sacado: string;
  situacao: string;
  vencimento: Date;
  pagamento: Date;
  referente: string;
  indicacoes: number;
  individual: number;
}

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.component.html',
  styleUrls: ['./to-pay.component.scss']
})
export class ToPayComponent implements OnInit {
  displayedColumns: string[] = ['nTitulo', 'sacado', 'situacao', 'vencimento', 'pagamento',
      'referente', 'indicacoes', 'individual', 'total'];
  dataSource: MatTableDataSource<ToPayData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
    this.applyPaginator();
  }

  ngOnInit() {

  }

  applyPaginator() {
    this.dataSource = new MatTableDataSource(TO_PAY_MOCK_DATA)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalRow(row) { return row.individual * row.indicacoes }
  getTotalColumn() {
    let total = 0;
    TO_PAY_MOCK_DATA.forEach(val => {
      total = total + (val.individual * val.indicacoes);
    });
    return total;
  }
}
