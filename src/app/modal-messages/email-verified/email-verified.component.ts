import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RegisterService } from 'src/app/services/register/register.service';
import { UserIdAndEmailService } from '../../services/user-id-email/user-email-id.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-email-verified',
  template:
  `<div class="confirm-modal">
    <div id="modal">
      <p>Seu e-mail ainda não foi confirmado. Por favor, confirme através do link no seu e-mail</p>
      <button (click)="resendEmail()"><i class="far fa-envelope"></i>Reenviar e-mail</button>
      <button (click)="closePopup()"><i class="fas fa-times"></i>Fechar</button>
    </div>
  </div>`,
  styleUrls: ['email-verified.component.scss']
})

export class EmailVerifiedComponent implements OnInit {
  loading = false;

  userEmailAndId: Object;

  subscription: Subscription;

  constructor(private regServive: RegisterService, private router: Router,
    private userIdEmailService: UserIdAndEmailService) {
  }

  ngOnInit() {
    this.userEmailAndId = this.userIdEmailService.userIdAndEmailSrc;
  }

  closePopup() {
    // Providing a `null` value to the named outlet
    // clears the contents of the named outlet
    this.router.navigate([{ outlets: { verified: null }}]);
  }

  resendEmail() {
    this.regServive.verifyEmail(this.userEmailAndId)
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate([{ outlets: { verified: null }}]);
          this.router.navigate([{ outlets: { message: ['solicitation-message'] }}]);
        },
        () => {
          this.router.navigate([{ outlets: { verified: null }}]);
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
        }
      );
  }
}
