import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';
import { AddressService } from 'src/app/services/address/address.service';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity/activity.service';

import { GENDER_CHART_DATA } from './gender-chart-data';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  activitiesTableData = [];
  addresses = [];
  cities = [];
  displayedColumnsState: string[] = ['state', 'stateQty',
    'city', 'cityQty'];
  dataSourceState: MatTableDataSource<any>;
  displayedColumnsActivities: string[] = ['name', 'total'];
  dataSourceActivities: MatTableDataSource<any>;
  loading = false;
  periods = [
    'Ontem',
    'Hoje',
    'Última semana',
    'Último mês'
  ]
  // Doughnut Chart
  public doughnutChartLabels: Label[] = [
    '01-13',
    '14-25',
    '26-40',
    '41-55',
    '56-70',
    '71-80',
    '80+'
  ];
  public doughnutChartGenderLabels = GENDER_CHART_DATA.doughnutChartLabels;
  public doughnutChartData: MultiDataSet = [
    [10, 10, 10, 10, 10, 10, 10],
  ];
  public doughnutChartGenderData = GENDER_CHART_DATA.doughnutChartData;
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartGenderType = GENDER_CHART_DATA.doughnutChartType;
  // Line Chart
  public lineChartData: ChartDataSets[] = [
    { data: [0, 10, 5, 2, 20, 30, 45], label: 'VENDAS' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
        ticks: {
          fontColor: 'white',  // x axe labels (can be hexadecimal too)
        },
        gridLines: {
          color: 'silver',  // grid line color (can be removed or changed)
          lineWidth: 0.3
        }
      }],
      yAxes: [{
        stacked: true,
        ticks: {
          fontColor: 'white',  // y axes numbers color (can be hexadecimal too)
          min: 0,
          beginAtZero: true,

        },
        gridLines: {
          color: 'silver',  // grid line color (can be removed or changed)
          lineWidth: 0.3  // grid line color (can be removed or changed)
        }
      }]
    },
    legend: {
      display: true,
      labels: {
        fontColor: 'white', // legend color (can be hexadecimal too)
      },
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'rgba(255, 99, 132)',
      backgroundColor: 'rgba(255, 255, 255, .3)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  resultsLength = 1;
  states = [];
  statesTableData = [];
  @ViewChild(MatPaginator) paginatorState: MatPaginator;
  @ViewChild(MatPaginator) paginatorActivities: MatPaginator;
  @ViewChild(MatSort) sortState: MatSort;
  @ViewChild(MatSort) sortActivities: MatSort;
  constructor(private addressService: AddressService,
    private router: Router, private actService: ActivityService) {}

  ngOnInit() {
    this.getPfAddresses();
  }

  applyPaginatorState() {
    this.loading = false;
    this.dataSourceState = new MatTableDataSource(this.statesTableData)
    this.dataSourceState.paginator = this.paginatorState;
    this.dataSourceState.sort = this.sortState;
  }

  applyFilterState(filterValue: string) {
    this.dataSourceState.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceState.paginator) {
      this.dataSourceState.paginator.firstPage();
    }
  }

  applyPaginatorActivities() {
    this.loading = false;
    this.dataSourceActivities.paginator = this.paginatorActivities;
    this.dataSourceActivities.sort = this.sortActivities;
  }

  applyFilterActivities(filterValue: string) {
    this.dataSourceActivities.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceActivities.paginator) {
      this.dataSourceActivities.paginator.firstPage();
    }
  }

  createArraysOfAddresses(addressesPf, addressesPj) {
    const addresses = addressesPf.concat(addressesPj);
    addresses.forEach(element => {
      this.states.push(element.estado);
      this.cities.push(element.cidade);
    });
    this.states.sort();
    this.cities.sort();
    this.createStatesObjs();
    this.applyPaginatorState();
  }

  createCitiesObjs() {
    let prev, a = [], b = [];
    for (let i = 0; i < this.cities.length; i++ ) {
        if ((this.cities[i] !== prev) && this.cities[i] !== '') {
            a.push(this.cities[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = this.cities[i];
    }
    const statesLenght = this.statesTableData.length;
    a.forEach((el, idx) => {
      if (idx < statesLenght) {
        this.statesTableData[idx].city = el;
        this.statesTableData[idx].cityQty = b[idx];
      } else {
        this.statesTableData.push({
          city: el,
          cityQty: b[idx]
        });
      }
    });
    this.applyPaginatorState();
  }

  createStatesObjs() {
    let prev, a = [], b = [];
    for (let i = 0; i < this.states.length; i++ ) {
        if ((this.states[i] !== prev) && this.states[i] !== '') {
            a.push(this.states[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = this.states[i];
    }
    a.forEach((el, idx) => {
        this.statesTableData.push({
          state: el,
          stateQty: b[idx]
        })
      }
    );
    this.createCitiesObjs();
  }

  concatActObjs(activitiesPf, activitiesPj) {
    for (let prop in activitiesPf) {
      if (activitiesPj.hasOwnProperty(prop)) {
        activitiesPf[prop] = activitiesPf[prop] + activitiesPj[prop];
      }
      const obj = {
        name: prop,
        qty: activitiesPf[prop]
      }
      this.activitiesTableData.push(obj);
    }
    for (let prop in activitiesPj) {
      if (!activitiesPf.hasOwnProperty(prop)) {
        const obj = {
          name: prop,
          qty: activitiesPj[prop]
        }
        this.activitiesTableData.push(obj);
      }
    }
    this.dataSourceActivities = new MatTableDataSource(this.activitiesTableData);
    this.applyPaginatorActivities();
  }

  getPfAddresses() {
    this.loading = true;
    this.addressService.indexPf().subscribe(
      addresses => this.getPjAddresses(addresses),
      _ => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      }
    );
  }

  getPjAddresses(addresses) {
    this.addressService.indexPj().subscribe(
      addresses => this.addresses = addresses,
      _ => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      },
      () => this.createArraysOfAddresses(this.addresses, addresses)
    );
  }
}

