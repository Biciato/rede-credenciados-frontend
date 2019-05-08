import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { AddressService } from 'src/app/services/address/address.service';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activities-table',
  templateUrl: './activities-table.component.html',
  styleUrls: ['./activities-table.component.scss']
})
export class ActivitiesTableComponent implements OnInit {
  activitiesTableData = [];
  displayedColumnsActivities: string[] = ['state', 'totalState',
    'city', 'totalCity'];
  dataSourceActivities: MatTableDataSource<any>;
  loading = false;
  @ViewChild(MatPaginator) paginatorActivities: MatPaginator;
  @ViewChild(MatSort) sortActivities: MatSort;
  constructor(private router: Router, private actService: ActivityService) {}

  ngOnInit() {
    this.getData();
  }

  applyPaginatorActivities() {
    this.loading = false;
    this.dataSourceActivities = new MatTableDataSource(this.activitiesTableData);
    this.dataSourceActivities.paginator = this.paginatorActivities;
    this.dataSourceActivities.sort = this.sortActivities;
  }

  applyFilterActivities(filterValue: string) {
    this.dataSourceActivities.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceActivities.paginator) {
      this.dataSourceActivities.paginator.firstPage();
    }
  }

  createDataTableSource(report) {
    console.log(report);
    for (let i = 0; i < report[0].length; i++) {
      this.activitiesTableData.push(
        {
          city: report[0][i],
          cityQty: report[1][i],
          state: report[2][i],
          stateQty: report[3][i],
        });
    };
    this.applyPaginatorActivities();
  }

  getData() {
    this.actService.report().subscribe(report => this.createDataTableSource(report));
  }
}

