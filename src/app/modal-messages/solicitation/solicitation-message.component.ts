import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-solicitation-message',
    template:
    `<div class="confirm-modal">
      <div id="modal">
        <p>Mensagem enviada com sucesso</p>
      </div>
    </div>
    <div class="app-modal-background"></div>`
})

export class SolicitationMessageComponent implements OnInit {

    constructor(private router: Router) {}

    ngOnInit() {
        setTimeout(() => this.closePopup(), 2000);
    }

    closePopup() {
        // Providing a `null` value to the named outlet
        // clears the contents of the named outlet
        this.router.navigate([{ outlets: { message: null }}]);
    }

}
