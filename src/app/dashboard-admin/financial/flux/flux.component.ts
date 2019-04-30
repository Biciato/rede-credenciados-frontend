import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SimpleUserService } from 'src/app/services/simple-user/simple-user.service';

export interface FluxData {
  jan: number;
  fev: number;
  mar: number;
  abr: number;
  mai: number;
  jun: number;
  jul: number;
  ago: number;
  set: number;
  out: number;
  nov: number;
  dez: number;
}

@Component({
  selector: 'app-flux',
  templateUrl: './flux.component.html',
  styleUrls: ['./flux.component.scss']
})
export class FluxComponent implements OnInit {
  displayedColumns: string[] = ['operacao', 'jan', 'fev', 'mar', 'abr', 'mai',
    'jun', 'jul', 'ago', 'set', 'out','nov', 'dez', 'total'];
  dataSource: MatTableDataSource<FluxData>;
  fluxData = [
    {
      jan: 100000.10,
      fev: 100000.00,
      mar: 100000.00,
      abr: 100000.00,
      mai: 100000.00,
      jun: 100000.00,
      jul: 100000.00,
      ago: 100000.00,
      set: 100000.00,
      out: 100000.00,
      nov: 100000.00,
      dez: 100000.00
    },
    {
      jan: 75000.00,
      fev: 75000.00,
      mar: 75000.00,
      abr: 75000.00,
      mai: 75000.00,
      jun: 75000.00,
      jul: 75000.00,
      ago: 75000.00,
      set: 75000.00,
      out: 75000.00,
      nov: 75000.00,
      dez: 75000.00
    },
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private simpleUserService: SimpleUserService) {
    this.applyPaginator();
  }

  ngOnInit() {

  }

  applyPaginator() {
    this.dataSource = new MatTableDataSource(this.fluxData)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Gets the total */
  getTotalJan() { return this.fluxData.map(t => t.jan).reduce((acc, value) => acc - value); }
  getTotalFev() { return this.fluxData.map(t => t.fev).reduce((acc, value) => acc - value); }
  getTotalMar() { return this.fluxData.map(t => t.mar).reduce((acc, value) => acc - value); }
  getTotalAbr() { return this.fluxData.map(t => t.abr).reduce((acc, value) => acc - value); }
  getTotalMai() { return this.fluxData.map(t => t.mai).reduce((acc, value) => acc - value); }
  getTotalJun() { return this.fluxData.map(t => t.jun).reduce((acc, value) => acc - value); }
  getTotalJul() { return this.fluxData.map(t => t.jul).reduce((acc, value) => acc - value); }
  getTotalAgo() { return this.fluxData.map(t => t.ago).reduce((acc, value) => acc - value); }
  getTotalSet() { return this.fluxData.map(t => t.set).reduce((acc, value) => acc - value); }
  getTotalOut() { return this.fluxData.map(t => t.out).reduce((acc, value) => acc - value); }
  getTotalNov() { return this.fluxData.map(t => t.nov).reduce((acc, value) => acc - value); }
  getTotalDez() { return this.fluxData.map(t => t.dez).reduce((acc, value) => acc - value); }
  getTotalCredit() {
    return Object.keys(this.fluxData[0]).reduce((sum,key)=>sum+parseFloat(this.fluxData[0][key]||0),0);
  }
  getTotalDebit() {
    return Object.keys(this.fluxData[1]).reduce((sum,key)=>sum+parseFloat(this.fluxData[1][key]||0),0);
  }
}
