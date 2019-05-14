import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-message',
  template:
  `<div class="confirm-modal">
    <div id="modal">
      <p>Dados atualizados com sucesso</p>
    </div>
  </div>
  <div class="app-modal-background"></div>`
})

export class UpdateMessageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.closePopup(), 2000);
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { update: null }}]);
  }

}
