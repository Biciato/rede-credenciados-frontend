import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, MultiDataSet } from 'ng2-charts';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<PeriodicElement>;
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
  public doughnutChartData: MultiDataSet = [
    [10, 10, 10, 10, 10, 10, 10],
  ];
  public doughnutChartType: ChartType = 'doughnut';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
