import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newsletter-message',
  template:
  `<div class="confirm-modal">
    <div id="modal">
      <p>E-mail cadastrado com sucesso. Agora, você receberá nossas novidades pelo seu e-mail.</p>
    </div>
  </div>
  <div class="app-modal-background"></div>`
})

export class NewsletterMessageComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => this.closePopup(), 4000);
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { newsletter: null }}]);
  }

}
