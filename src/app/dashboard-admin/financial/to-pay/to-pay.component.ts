import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SimpleUserService } from 'src/app/services/simple-user/simple-user.service';

export interface ClientData {
  nome: string;
  email: string;
  tel: string;
  cidade: string;
  estado: string;
  pagamento_status: string;
}

@Component({
  selector: 'app-to-pay',
  templateUrl: './to-pay.component.html',
  styleUrls: ['./to-pay.component.scss']
})
export class ToPayComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'tel', 'cidade', 'estado',
      'pagamento_status'];
  dataSource: MatTableDataSource<ClientData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private simpleUserService: SimpleUserService) {
    this.simpleUserService.index().subscribe((clients: Array<ClientData>) => this.applyPaginator(clients));
  }

  ngOnInit() {

  }

  applyPaginator(clients) {
    this.dataSource = new MatTableDataSource(clients)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
