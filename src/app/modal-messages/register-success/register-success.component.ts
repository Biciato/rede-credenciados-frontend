import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-success',
    template:
    `<div class="confirm-modal">
      <div id="modal">
        <p>Caro usuário, enviamos para o seu e-mail, um link para confirmar o cadastro. Por favor, verifique-o
          para podermos finalizar teu cadastro. </p>
        <button (click)="closePopup()" class="rd-button-dash" style="background-color: #33b5e5">OK</button>
      </div>
    </div>
    <div class="app-modal-background"></div>`
})

export class RegisterSuccessComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
    }

    closePopup() {
        // Providing a `null` value to the named outlet
        // clears the contents of the named outlet
        this.router.navigate([{ outlets: { success: null }}]);
    }
}
