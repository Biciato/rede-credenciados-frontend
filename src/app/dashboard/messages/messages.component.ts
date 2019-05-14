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
  countMensagensLida = 0;
  loading = false;
  mensagens: Mensagem[];
  mensagemLida: boolean;
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
    this.msgService.mensagensUser(this.user)
      .subscribe(mensagens => this.setMgs(mensagens), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
  }

  // check which messages were read
  checkMsgsRead(item) {
    if (item.mensagem_lida !== null) {
      if (!item.mensagem_lida.includes(this.user.id)) { this.countMensagensLida++; }
    } else {
      item.mensagem_lida = [];
    }
  }

  // check which messages were selected
  checkMsg(msg) {
    const idx = this.mensagensSelected.indexOf(msg);
    this.mensagensSelected.includes(msg) ? this.mensagensSelected.splice(idx, 1) :
      this.mensagensSelected.push(msg);
  }

  closeModal(id) {
    this.modalService.close(id);
  }

  // open message in modal
  openMensagem(i) {
    this.mensagemSelected = this.mensagens[i];
    this.modalService.open('custom-modal-5');
  }

  // resets messages after mark read update
  resetMsgs(id?) {
    this.msgService.mensagensUser(this.user)
      .subscribe(mensagens => this.setMgs(mensagens), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
    this.mensagensSelected = [];
    this.selectAllFlag = false;
    if (id) {this.modalService.close(id); }
  }

  // set message as read on server
  setAsRead() {
    this.loading = true;
    this.msgService.setAsRead(this.mensagemSelected.id, this.user)
      .subscribe(() => this.resetMsgs('custom-modal-5'), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
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

  // get messages from server and build pagination
  setMgs(msgs) {
    this.loading = false;
    if (msgs.length > 0) {
      this.countMensagensLida = 0;
      this.mensagens = msgs;
      this.mensagens.forEach(item => this.checkMsgsRead(item));
    }
  }

  // set collections of message as read on server
  setAsReadCol() {
    this.loading = true;
    this.mensagensSelectedId = [];
    this.mensagensSelected.forEach(item => this.mensagensSelectedId.push(item.id));
    this.msgService.setAsReadCol(this.mensagensSelectedId, this.user)
      .subscribe(() => this.resetMsgs(), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
  }

  // set collections of message as unread on server
  setAsUnreadCol() {
    this.loading = true;
    this.mensagensSelected.forEach(item => this.mensagensSelectedId.push(item.id));
    this.msgService.setAsUnreadCol(this.mensagensSelectedId, this.user)
      .subscribe(() => this.resetMsgs(), () => {
        this.router.navigate([{ outlets: { error: ['error-message'] }}]);
        this.loading = false;
      });
  }
}
