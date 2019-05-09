import {Component, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';

import { DetailsDialog } from './details.dialog';

import { PAYED_USED_MOCK_DATA } from './payed-used-mock-data';

export interface PayedUsedData {
  situacao: string;
  formPgto: string;
  titular: string;
  vencimento: Date;
  valor: number;
  saldo: string;
}

@Component({
  selector: 'app-payed-used',
  templateUrl: './payed-used.component.html',
  styleUrls: ['./payed-used.component.scss']
})
export class PayedUsedComponent {
  displayedColumns: string[] = ['situacao', 'formPgto', 'titular', 'vencimento', 'valor',
      'saldo', 'detalhes'];
  dataSource: MatTableDataSource<PayedUsedData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.applyPaginator();
  }

  applyPaginator() {
    this.dataSource = new MatTableDataSource(PAYED_USED_MOCK_DATA)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(row): void {
    this.dialog.open(DetailsDialog, {
      width: 'fit-content',
      data: row
    });
  }
}
