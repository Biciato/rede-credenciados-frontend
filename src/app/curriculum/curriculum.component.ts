import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CurriculoService } from '../services/curriculo/curriculo.service';
import { ModalService } from '../services/modal/modal.service';

@Component({
    selector: 'app-curriculum',
    templateUrl: 'curriculum.component.html',
    styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

    curriculoForm = new FormGroup({
        nome: new FormControl(null, {
            validators: Validators.required
        }),
        email: new FormControl(null, {
            validators: Validators.required
        }),
        tel: new FormControl(null, {
            validators: [Validators.required]
        })
    });

    loading = false;

    nomeArquivo: string;

    saveFlag = false;

    constructor(private curriculoService: CurriculoService,
                private modalService: ModalService,
                private router: Router) { }

    ngOnInit() {
    }

    // triggers input click after user selects a file from his files
    chooseArquivo() {
        document.getElementById('arquivo').click();
    }

    fileEvent(fileInput) {
        const file = fileInput.target.files[0];
        this.nomeArquivo = file.name;
        this.saveFlag = true;
    }

    onCurriculoFormSubmit() {
        this.loading = true;
        const arquivo = <HTMLInputElement>document.getElementById('arquivo');
        const formData = new FormData();
        formData.append('curriculo', arquivo.files[0]);
        if (arquivo.files[0].type === 'application/pdf') {
            this.curriculoService.create(
                {
                    nome: this.curriculoForm.value.nome,
                    email: this.curriculoForm.value.email,
                    tel: this.curriculoForm.value.tel,
                    nome_arquivo: arquivo.files[0].name
                }
            ).subscribe(
                (curriculo) => this.storePdf(formData, curriculo.id, arquivo.files[0].name),
                () => this.loading = false
            );
        } else {
            this.loading = false;
            this.modalService.open('modal-aviso-pdf');
        }
    }

    storePdf(curriculo_id, formData, arquivo) {
        this.curriculoService.store(formData, curriculo_id, arquivo)
            .subscribe(
                () => {
                    this.curriculoForm.reset();
                    this.router.navigate([{ outlets: { propaganda: ['register-propaganda'] }}]);
                    this.loading = false;
                },
                () => this.loading = false,
                () => this.saveFlag = false
            );
    }

    closeModal(id) {
        this.modalService.close(id);
    }

    // tel field mask
    onKeyCel(event: any) {
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /(\d{0})(\d)/ , '$1($2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1) $2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{5})(\d)/ , '$1-$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    }

}
