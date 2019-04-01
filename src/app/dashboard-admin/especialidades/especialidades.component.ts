import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { ActivityService } from '../../services/activity/activity.service';

import { Atividade } from '../../models/atividade';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-especialidades',
    templateUrl: 'especialidades.component.html',
    styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

    atividades: Atividade[];
    loading = false;
    newAtividadeFlag = false;
    nome = new FormControl(null, {
        validators: Validators.required
    });
    p = 1;
    searchText: string;
    token: string;

    constructor(
        private actService: ActivityService,
        private modalService: ModalService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        // getting token from localStorage and pj and activities from server
        this.token = JSON.parse(window.localStorage.getItem('user_rede_credenciados')).token;
        this.getAtividades();
    }

    getAtividades() {
        this.loading = true;
        this.actService.all().subscribe(
            atividades => {
                this.atividades = atividades.sort(this.compare);
                this.loading = false;
            },
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }

    deleteAtividade(atividade) {
        this.loading = true;
        this.actService.deleteAtividade(atividade, this.token).subscribe(
            () => this.getAtividades(),
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }

    // function that sorts on alphabetic order
    compare(a, b) {
        // Use toUpperCase() to ignore character casing
        const atividadeA = a.atividade.toUpperCase();
        const atividadeB = b.atividade.toUpperCase();

        let comparison = 0;
        if (atividadeA > atividadeB) {
          comparison = 1;
        } else if (atividadeA < atividadeB) {
          comparison = -1;
        }
        return comparison;
    }

    openModal() {
        this.modalService.open('modal-especialidade');
    }

    closeModal() {
        this.modalService.close('modal-especialidade');
    }

    saveEspecialidade() {
        this.loading = true;
        this.actService.newAtividade(this.nome.value, this.token).subscribe(
            () => {
                this.newAtividadeFlag = false;
                this.getAtividades();
                this.modalService.close('modal-especialidade');
            },
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }
}
