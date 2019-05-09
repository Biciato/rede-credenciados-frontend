import {Component, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SimpleUserService } from 'src/app/services/simple-user/simple-user.service';
import { Router } from '@angular/router';

export interface ClientData {
  nome: string;
  email: string;
  tel: string;
  cidade: string;
  estado: string;
  pagamento_status: string;
}

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  displayedColumns: string[] = ['nome', 'email', 'tel', 'cidade', 'estado',
    'pagamento_status'];
  dataSource: MatTableDataSource<ClientData>;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private simpleUserService: SimpleUserService,
    private router: Router) {
    this.loading = true;
    this.simpleUserService.index().subscribe(
      (clients: Array<ClientData>) => this.applyPaginator(clients),
      () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      }
    );
  }

  applyPaginator(clients) {
    this.dataSource = new MatTableDataSource(clients)
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
}
