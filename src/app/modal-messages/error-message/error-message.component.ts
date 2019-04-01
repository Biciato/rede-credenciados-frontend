import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-error-message',
    template:
    `<div class="confirm-modal">
      <div id="modal">
        <p>Algo deu errado. Por favor, tente mais tarde ou contate o Rede Credenciados.</p>
        <button (click)="closePopup()"><i class="fas fa-times"></i>Fechar</button>
      </div>
    </div>`,
    styleUrls: ['error-message.component.scss']
})

export class ErrorMessageComponent {

    constructor(private router: Router) {}

    closePopup() {
        // Providing a `null` value to the named outlet
        // clears the contents of the named outlet
        this.router.navigate([{ outlets: { error: null }}]);
    }

}
