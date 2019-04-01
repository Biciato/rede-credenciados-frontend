import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { LoginService } from '../services/login/login.service';
import { RegisterService } from '../services/register/register.service';
import { ModalService } from '../services/modal/modal.service';
import { Router } from '@angular/router';
import { EmailConfirmationComponent } from '../email-confirmation/email-confirmation.component';

@Component({
    selector: 'app-forget-email',
    templateUrl: 'forget-password-email.component.html',
    styleUrls: ['./forget-password-email.component.scss']
})
export class ForgetPasswordEmailComponent {
    email = new FormControl(null, {
            validators: [Validators.required, Validators.email],
            updateOn: 'blur'
        });
    loading = false;

    constructor(private loginService: LoginService,
                private modalService: ModalService,
                private regService: RegisterService,
                private router: Router) {}

    checkEmail() {
        if (this.email.valid) {
            this.loading = true;
            this.regService.checkUserEmail(this.email.value)
                .subscribe((user) => {
                        this.sendEmail(user.id, user.email);
                        this.loading = false;
                    },
                    () => {
                        this.openModal('modal-email');
                        this.loading = false;
                    }
                );
        } else {
            this.openModal('modal-validator');
        }
    }

    closeModal(id) {
        this.modalService.close(id);
    }

    openModal(id) {
        this.modalService.open(id);
    }

    sendEmail(id, email) {
        this.loading = true;
        this.loginService.sendEmail(id, email).subscribe(
            () => {
                this.email.reset();
                this.loading = false;
                this.openModal('modal-mensagem');
            },
            () => {
                this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                this.loading = false;
            }
        );
    }

}
