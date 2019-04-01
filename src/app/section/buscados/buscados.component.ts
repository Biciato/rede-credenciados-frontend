import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-buscados',
    template: `
        <div>
            <h3><span>MAIS BUSCADOS</span></h3>
            <p>
                <span *ngFor="let job of jobs" [style.font-size.em]="job.length > 17 ? 0.9 : 0.1 * job.length " >{{ job }}-</span>
            </p>
        </div>
    `,
    styleUrls: ['buscados.component.scss']
})

export class BuscadosComponent implements OnInit {
    mathRandom: Math;

    jobs: String[];

    constructor() {
        this.jobs = ['Acuidade Visual', 'Audiometria', 'Aux de Enfermagem',
        'Avaliação Clínica', 'Avaliação Psicológica', 'Clínica Diagnóstico por Imagem',
        'Clínica Médica', 'ECG - Eletrocardiograma', 'EEG - Eletroencefalograma',
        'Enfermagem do Trabalho', 'Engenheiro(a) de Segurança do Trabalho',
        'EPC - (Equipamento de Proteção Coletiva)', 'EPI - (Equipamento de Proteção Individual)',
        'Ergonomista', 'Espirometria', 'Exames In Company', 'Exames Laboratoriais',
        'Fisioterapeuta', 'Fonoaudiólogo(a)', 'Laboratório de Análises Ambientais',
        'Laboratório de Análises Clínicas', 'Medicina do Trabalho', 'Medicina e Segurança do Trabalho',
        ];
    }

    ngOnInit() { }
}
