import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FriendIndicationService } from '../../services/friend-indication/friend-indication.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
    selector: 'app-friend-indication',
    templateUrl: 'friend-indication.component.html',
    styleUrls: ['friend-indication.component.scss']
})

export class FriendIndicationComponent implements OnInit {

    emailFormFlag = false;

    loading = false;

    // Initiating form Groups
    viaEmailForm = new FormGroup({
        nome: new FormControl(null, { validators: Validators.required }),
        email: new FormControl(null, { validators: [Validators.required,
            Validators.email], updateOn: 'blur' }),
        mensagem: new FormControl(null, { validators: Validators.required }),
        nome_indicado: new FormControl(null, { validators: Validators.required }),
    });
    viaWhatForm = new FormGroup({
        indicatedName: new FormControl(null, { validators: Validators.required }),
        whatsapp: new FormControl(null, { validators: [Validators.required,
            Validators.minLength(15)], updateOn: 'blur' }),
        message: new FormControl(null, { validators: Validators.required }),
        indicator: new FormControl(null, { validators: Validators.required }),
    });
    viaSMSForm = new FormGroup({
        indicatedName: new FormControl(null, { validators: Validators.required }),
        cel: new FormControl(null, { validators: [Validators.required,
            Validators.minLength(15)], updateOn: 'blur' }),
        message: new FormControl(null, { validators: Validators.required }),
        indicator: new FormControl(null, { validators: Validators.required }),
    });

    smsFormFlag = false;

    whatFormFlag = false;

    constructor(private frieIndService: FriendIndicationService, private modalService: ModalService,
                private router: Router) { }

    ngOnInit() {
    }

    get nome() { return this.viaEmailForm.get('nome'); }
    get email() { return this.viaEmailForm.get('email'); }
    get message() { return this.viaEmailForm.get('mensagem'); }
    get nome_indicado() { return this.viaEmailForm.get('nome_indicado'); }

    get nomeWS() { return this.viaWhatForm.get('indicatedName'); }
    get whatsapp() { return this.viaWhatForm.get('whatsapp'); }
    get messageWS() { return this.viaWhatForm.get('message'); }
    get indicatorWS() { return this.viaWhatForm.get('indicator'); }

    get nomeSMS() { return this.viaSMSForm.get('indicatedName'); }
    get cel() { return this.viaSMSForm.get('cel'); }
    get messageSMS() { return this.viaSMSForm.get('message'); }
    get indicatorSMS() { return this.viaSMSForm.get('indicator'); }

    closeModal(id) {
        this.modalService.close(id);
    }

    openModal(id) {
        this.modalService.open(id);
    }

    // Send Email
    onViaEmailSubmit() {
        if (this.viaEmailForm.valid) {
            this.loading = true;
            this.frieIndService.sendEmail(this.viaEmailForm.value)
                .subscribe(
                    () => {
                        this.viaEmailForm.reset();
                        this.loading = false;
                        this.router.navigate([{ outlets: { message: ['solicitation-message'] }}]);
                    },
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
        } else {
            this.smsFormFlag = false;
            this.whatFormFlag = false;
            this.emailFormFlag = true;
            this.openModal('modal-validator');
        }
    }

    // Send SMS
    onViaSMSSubmit() {
        if (this.viaSMSForm.valid) {
            this.loading = true;
            const telString = this.viaSMSForm.value.tel.replace(/[^a-zA-Z0-9]/g, '');
            this.frieIndService
                .sendSMS({tel: telString, message: this.viaSMSForm.value.message})
                .subscribe(() => {
                        this.viaSMSForm.reset();
                        this.loading = false;
                        this.router.navigate([{ outlets: { message: ['solicitation-message'] }}]);
                    },
                    () => {
                        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
                        this.loading = false;
                    }
                );
        } else {
            this.whatFormFlag = false;
            this.emailFormFlag = false;
            this.smsFormFlag = true;
            this.openModal('modal-validator');
        }
    }

    // Open Whatsapp to send message
    onViaWhatSubmit() {
        if (this.viaWhatForm.valid) {
            const telNumber = this.viaWhatForm.value.whatsapp.replace(/[- )(]/g, '');
            const normalizeMsg = this.viaWhatForm.value.message.replace(' ', '%20');
            const url = `https://api.whatsapp.com/send?phone=55${telNumber}&text=${normalizeMsg}`;
            window.open(url);
            this.viaWhatForm.reset();
        } else {
            this.smsFormFlag = false;
            this.emailFormFlag = false;
            this.whatFormFlag = true;
            this.openModal('modal-validator');
        }
    }

    // Cel mask
    onKeyCel(event: any) {
        event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
        event.target.value = event.target.value.replace( /(\d{0})(\d)/ , '$1($2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1) $2'); // Coloca um ponto entre o segundo e o terceiro dígitos
        event.target.value = event.target.value.replace( /(\d{5})(\d)/ , '$1-$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
    }
}
