import { Component, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DETAILS_MOCK_DATA } from './details-mock-data';

export interface DetailsData {
  type: string;
  date: Date;
  pay: Date;
  status: string;
  paymentForm: string;
  reference: string;
  total: number;
}

@Component({
  selector: 'details-dialog',
  templateUrl: 'details.dialog.html',
  styleUrls: ['details.dialog.scss']
})
export class DetailsDialog {
  dataSource: MatTableDataSource<DetailsData>;
  displayedColumns: string[] = ['type', 'date', 'pay', 'status', 'paymentForm',
    'reference', 'total'];

  constructor(
    public dialogRef: MatDialogRef<DetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataSource = new MatTableDataSource(DETAILS_MOCK_DATA)
  }

  getTotalCredit(): number {
    let total = 0;
    DETAILS_MOCK_DATA.forEach(val => val.type === 'crédito' ? total = total + val.total : total);
    return total;
  }

  getTotalDebit(): number {
    let total = 0;
    DETAILS_MOCK_DATA.forEach(val => val.type === 'débito' ? total = total + val.total : total);
    return total;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
