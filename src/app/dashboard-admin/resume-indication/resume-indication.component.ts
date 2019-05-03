import {Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FriendIndicationService } from 'src/app/services/friend-indication/friend-indication.service';

export interface ResumeIndicationData {
  quem_indicou: string;
  indicado: string;
  forma_indicacao: string;
  cidade: string;
  estado: string;
  bairro: string;
  created_at: Date;
}

@Component({
  selector: 'app-resume-indication',
  templateUrl: 'resume-indication.component.html',
  styleUrls: ['resume-indication.component.scss']
})
export class ResumeIndicationComponent implements OnInit {
  displayedColumns: string[] = ['indicator', 'indicated', 'resend', 'dateInd', 'indForm',
      'city', 'district', 'state'];
  dataSource: MatTableDataSource<ResumeIndicationData>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private friendInd: FriendIndicationService) {
    this.friendInd.index().subscribe((indications: Array<ResumeIndicationData>) => this.applyPaginator(indications));
  }

  ngOnInit() {

  }

  applyPaginator(indications) {
    this.dataSource = new MatTableDataSource(indications)
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
