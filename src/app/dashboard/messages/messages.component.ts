import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MensagemService } from '../../services/mensagem/mensagem.service';

import { Mensagem } from '../../models/mensagem';
import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-messages',
  templateUrl: 'messages.component.html',
  styleUrls: ['messages.component.scss']
})

export class MessagesComponent implements OnInit {

  checked = false;
  loading = false;
  mensagens: Mensagem[];
  mensagemLida: boolean;
  mensagensLida = [];
  mensagemSelected: Mensagem;
  mensagensSelected: Mensagem[];
  mensagensSelectedId = [];
  p = 1;
  selectAllFlag = false;
  user: any;

  constructor(
    private msgService: MensagemService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.mensagensSelected = [];
    this.mensagens = [];
  }

  ngOnInit() {
    this.loading = true;
    this.user = JSON.parse(window.localStorage.getItem('user_rede_credenciados'));
    this.msgService.mensagensUser(this.user.id, this.user.token)
      .subscribe(mensagens => this.setMgs(mensagens), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
  }

  // get messages from server and build pagination
  setMgs(msgs) {
    this.loading = false;
    if (msgs.length > 0) {
      this.mensagensLida = [];
      this.mensagens = msgs;
      this.mensagens.forEach(item => this.checkMsgsRead(item));
    }
  }

  // check which messages were read
  checkMsgsRead(item) {
    if (item.mensagemLida === 0 || item.mensagemLida === '0') { this.mensagensLida.push(item); }
  }

  // Select all checkboxes
  selectAll() {
    const els = document.getElementsByName('mensagem_checkbox');
    if (this.selectAllFlag === false) {
      [].forEach.call(els, (el) => el.checked = true);
      this.mensagensSelected = [];
      this.mensagens.forEach(item => this.mensagensSelected.push(item));
    } else {
      [].forEach.call(els, (el) => el.checked = false);
      this.mensagensSelected = [];
    }
    this.selectAllFlag = !this.selectAllFlag;
  }

  // open message in modal
  openMensagem(i) {
    this.mensagemSelected = this.mensagens[i];
    this.modalService.open('custom-modal-5');
  }

  // check which messages were selected
  checkMsg(msg) {
    const idx = this.mensagensSelected.indexOf(msg);
    this.mensagensSelected.includes(msg) ? this.mensagensSelected.splice(idx, 1) :
      this.mensagensSelected.push(msg);
  }

  // set message as read on server
  setAsRead() {
    this.loading = true;
    this.msgService.setAsRead(this.mensagemSelected.id, this.user.token)
      .subscribe(() => this.resetMsgs('custom-modal-5'), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
  }

  // set collections of message as read on server
  setAsReadCol() {
    this.loading = true;
    this.mensagensSelectedId = [];
    this.mensagensSelected.forEach(item => this.mensagensSelectedId.push(item.id));
    this.msgService.setAsReadCol(this.mensagensSelectedId, this.user.token)
      .subscribe(() => this.resetMsgs(), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
  }

  // set collections of message as unread on server
  setAsUnreadCol() {
    this.loading = true;
    this.mensagensSelected.forEach(item => this.mensagensSelectedId.push(item.id));
    this.msgService.setAsUnreadCol(this.mensagensSelectedId, this.user.token)
      .subscribe(() => this.resetMsgs(), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
  }

  // resets messages after mark read update
  resetMsgs(id?) {
    this.msgService.mensagensUser(this.user.id, this.user.token)
      .subscribe(mensagens => this.setMgs(mensagens), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
    this.mensagensSelected = [];
    this.selectAllFlag = false;
    if (id) {this.modalService.close(id); }
  }

  closeModal(id) {
    this.modalService.close(id);
  }
}
