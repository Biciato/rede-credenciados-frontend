import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message',
  template:
  `<div class="confirm-modal">
    <div id="modal">
      <p>Combinação usuário/senha não confere</p>
      <button (click)="closePopup()"><i class="fas fa-times"></i>Fechar</button>
    </div>
  </div>`,
  styleUrls: ['message.component.scss']
})

export class MessageComponent {

  constructor(private router: Router) {}

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { popup: null }}]);
  }

}
