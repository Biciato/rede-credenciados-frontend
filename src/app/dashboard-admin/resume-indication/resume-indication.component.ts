import {Component, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { FriendIndicationService } from 'src/app/services/friend-indication/friend-indication.service';
import { Router } from '@angular/router';

export interface ResumeIndicationData {
  quem_indicou: string;
  indicado: string;
  forma_indicacao: string;
  cidade: string;
  estado: string;
  bairro: string;
  updated_at: Date;
}

@Component({
  selector: 'app-resume-indication',
  templateUrl: 'resume-indication.component.html',
  styleUrls: ['resume-indication.component.scss']
})
export class ResumeIndicationComponent {
  displayedColumns: string[] = ['indicator', 'indicated', 'resend', 'dateInd',
    'indForm', 'city', 'district', 'state'];
  dataSource: MatTableDataSource<ResumeIndicationData>;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private friendIndService: FriendIndicationService,
    private router: Router) {
      this.loading = true;
      this.getindications();
  }

  applyPaginator(indications) {
    this.dataSource = new MatTableDataSource(indications)
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

  getindications() {
    this.friendIndService.index().subscribe(
      (indications: Array<ResumeIndicationData>) => this.applyPaginator(indications),
      _ => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      }
    );
  }

  // Resend Email to Friend Indication
  resend(indication) {
    this.loading = true;
    this.friendIndService.sendEmail(
        {
          nome: indication.quem_indicou,
          email: indication.forma_indicacao,
          nome_indicado: indication.indicado,
          mensagem: indication.mensagem
        }
      )
      .subscribe(
        _ => {
          this.update(indication.id);
        },
        _ => {
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
        }
      );
  }

  update(id) {
    this.friendIndService.update(id, Date.now())
      .subscribe(
        _ => {
          this.router.navigate([{ outlets: { message: ['solicitation-message'] }}]);
          this.getindications();
        },
        _ => {
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
        }
      );
  }
}
