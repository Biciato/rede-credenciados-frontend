import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register-unidade',
    template:
    `<div class="confirm-modal">
      <div id="modal">
        <p>Unidade cadastrada com sucesso</p>
      </div>
    </div>
    <div class="app-modal-background"></div>`
})

export class RegisterUnidadeComponent implements OnInit {
    constructor(private router: Router) { }

    ngOnInit() {
        setTimeout(() => this.closePopup(), 3000);
    }

    closePopup() {
        // Providing a `null` value to the named outlet
        // clears the contents of the named outlet
        this.router.navigate([{ outlets: { unidade: null }}]);
    }
}
