import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-confirmation-error',
  template:
  `<div class="confirm-modal">
    <div id="modal">
      <p>A confirmação da senha não é igual a senha</p>
      <button (click)="closePopup()"><i class="fas fa-times"></i>Fechar</button>
    </div>
  </div>`,
  styleUrls: ['password-confirmation-error.component.scss']
})

export class PasswordConfirmationErrorComponent {

  constructor(private router: Router) {}

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { password: null }}]);
  }

}
