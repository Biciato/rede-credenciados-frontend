import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-arquivo-success',
    template:
    `<div class="confirm-modal">
      <div id="modal">
        <p>Arquivo gravado com sucesso</p>
      </div>
    </div>
    <div class="app-modal-background"></div>`
})

export class ArquivoUploadComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {
        setTimeout(() => this.closePopup(), 2000);
    }

    closePopup() {
        // Providing a `null` value to the named outlet
        // clears the contents of the named outlet
        this.router.navigate([{ outlets: { arquivo: null }}]);
    }

}
