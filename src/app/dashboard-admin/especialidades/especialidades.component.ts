import {Component, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { NewActivityDialog } from './new-activity.dialog';

export interface ActivityData {
  atividade: string;
}

@Component({
  selector: 'app-especialidades',
  templateUrl: 'especialidades.component.html',
  styleUrls: ['especialidades.component.scss']
})
export class EspecialidadesComponent {
  displayedColumns: string[] = ['name', 'delete'];
  dataSource: MatTableDataSource<ClientData>;
  loading = false;
  name: string;
  user: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private actService: ActivityService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
    this.getActivities();
  }

  applyPaginator(activities) {
    this.loading = false;
    this.dataSource = new MatTableDataSource(activities)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  create(atividade) {
    this.loading = true;
    this.actService.newAtividade(atividade, this.user.token)
      .subscribe(
        _ => this.getActivities(),
        () => {
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
      });
  }

  delete(row) {
    this.loading = true;
    this.actService.deleteAtividade(row.id, this.user.token)
      .subscribe(
        _ => {
          this.router.navigate([{ outlets: { update: ['update-message'] }}]);
          this.getActivities();
        },
        () => {
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
      });
  }

  getActivities() {
    this.loading = true;
    this.actService.all().subscribe(
      (activities: Array<ActivityData>) => this.applyPaginator(activities),
      () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewActivityDialog, {
      width: 'fit-content',
      data: {name: this.name}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.actService.newAtividade(result, this.user.token)
        .subscribe(
          _ => {
            this.getActivities();
            this.router.navigate([{ outlets: { update: ['update-message'] }}]);
          },
          () => {
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
            this.loading = false;
        });
    });
  }
}
