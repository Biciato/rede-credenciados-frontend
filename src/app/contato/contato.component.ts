import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContatoEmailService } from '../services/contato-email/contato-email.service';
import { Router } from '@angular/router';
import { ModalService } from '../services/modal/modal.service';

@Component({
  selector: 'app-contato',
  templateUrl: 'contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent implements OnInit {
  contatoForm = new FormGroup({
    nome: new FormControl(null, {validators: Validators.required, updateOn: 'blur' }),
    email: new FormControl(null, {validators: [Validators.required,
      Validators.email], updateOn: 'blur' }),
    tel: new FormControl(null, {validators: [Validators.required,
      Validators.minLength(14)], updateOn: 'blur' }),
    cel: new FormControl(null, {validators: Validators.minLength(15), updateOn: 'blur' }),
    mensagem: new FormControl(null, {validators: Validators.required, updateOn: 'blur' }),
  });

  loading = false;

  constructor(private contEmail: ContatoEmailService, private router: Router,
    private modalService: ModalService) { }

  ngOnInit() {
  }

  get nome() { return this.contatoForm.get('nome'); }
  get email() { return this.contatoForm.get('email'); }
  get tel() { return this.contatoForm.get('tel'); }
  get cel() { return this.contatoForm.get('cel'); }
  get mensagem() { return this.contatoForm.get('mensagem'); }

  closeModal(id) {
    this.modalService.close(id);
  }

  onContatoFormSubmit() {
    if (this.contatoForm.valid) {
      this.loading = true;
      // send email through server
      this.contEmail.contatoEmail({
          email_to: 'contato@redecredenciados.com.br',
          nome: this.contatoForm.value.nome,
          email: this.contatoForm.value.email,
          tel: this.contatoForm.value.tel,
          cel: this.contatoForm.value.cel,
          mensagem: this.contatoForm.value.mensagem,
      }).subscribe(
        () => {
          this.contatoForm.reset();
          this.router.navigate([{ outlets: { message: ['solicitation-message'] }}]);
          this.loading = false;
        },
        () => {
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
        }
      );
    } else {
      this.openModal('modal-validator');
    }
  }

  // tel field mask
  onKeyTel(event: any) {
    event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
    event.target.value = event.target.value.replace( /(\d{0})(\d)/ , '$1($2'); // Coloca um ponto entre o segundo e o terceiro dígitos
    event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1) $2'); // Coloca um ponto entre o segundo e o terceiro dígitos
    event.target.value = event.target.value.replace( /(\d{4})(\d)/ , '$1-$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
  }

  // cel field mask
  onKeyCel(event: any) {
    event.target.value = event.target.value.replace( /\D/g , ''); // Remove tudo o que não é dígito
    event.target.value = event.target.value.replace( /(\d{0})(\d)/ , '$1($2'); // Coloca um ponto entre o segundo e o terceiro dígitos
    event.target.value = event.target.value.replace( /(\d{2})(\d)/ , '$1) $2'); // Coloca um ponto entre o segundo e o terceiro dígitos
    event.target.value = event.target.value.replace( /(\d{5})(\d)/ , '$1-$2'); // Coloca um ponto entre o terceiro e o quarto dígitos
  }

  openModal(id) {
    this.modalService.open(id);
  }

}
