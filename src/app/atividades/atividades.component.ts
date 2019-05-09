import { Component, OnInit } from '@angular/core';

import { ActivityService } from '../services/activity/activity.service';
import { ModalService } from '../services/modal/modal.service';

import { Atividade } from '../models/atividade';

@Component({
  selector: 'app-atividades',
  template: `
    <div id="modalHeader">
        <h2>SELECIONE AS ESPECIALIDADES</h2>
    </div>
    <div id="modalBody">
      <div id="atividades">
        <div *ngFor="let atividade of atividades; let i = index">
          <label [for]="i">
            <input type="checkbox" [name]="atividade.atividade"
            class="checkbox" (click)="addOrRemove($event)"
            [checked]="atividadesSelected.includes(atividade.atividade)">
            {{ atividade.atividade }}
          </label>
        </div>
      </div>
      <div id="buttonBottom">
        <button (click)="submit()" class="rd-button-dash">FINALIZAR SELEÇÃO</button>
      </div>
    </div>
  `,
  styleUrls: ['./atividades.component.scss']
})
export class AtividadesComponent implements OnInit {

  atividades: Atividade[];

  atividadesSelected = [];

  constructor(private actService: ActivityService, private modalService: ModalService) { }

  ngOnInit() {
    // gets activities from server
    this.actService.all().subscribe(atividades => this.atividades = atividades);
    this.actService.atividadeList$.subscribe(atividades => this.atividadesSelected = atividades);
  }

  addOrRemove(event) {
    // checks if activity choose is already choose
    this.atividadesSelected.includes(event.target.name) ?
      this.atividadesSelected.splice(event.target.name, 1) :
      this.atividadesSelected.push(event.target.name);
  }

  submit() {
    this.modalService.close('modal-atividades');
  }

}

