import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { ModalService } from 'src/app/services/modal/modal.service';
import { MensagemService } from 'src/app/services/mensagem/mensagem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages-admin',
  templateUrl: './messages-admin.component.html',
  styleUrls: ['./messages-admin.component.scss']
})
export class MessagesAdminComponent implements OnInit {
  jobsFull = [];
  jobTags = [];
  loading = false;

  messageForm = this.fb.group({
    title: ['', Validators.required],
    message: ['', [Validators.required]],
  });

  constructor(
    private actService: ActivityService,
    private fb: FormBuilder,
    private modalService: ModalService,
    private msgService: MensagemService,
    private router: Router
  ) {
    this.actService.all()
      .subscribe(
          activityList => activityList.map(
            atividade => this.jobsFull.push(atividade)),
          _ => {
            this.router.navigate([{ outlets: { error: ['error-message'] }}]);
            this.loading = false;
          },
          () => this.loading = false
      );
  }

  get f() { return this.messageForm.controls; }

  ngOnInit() {
  }

  closeModal(id) {
    this.modalService.close(id);
  }

  openModal(id) {
    this.actService.passAtividadesToComponent(this.jobTags);
    this.modalService.open(id);
  }

  // remove state tag
  removeJob(job) {
    this.jobTags = this.jobTags.filter(val => val !== job);
  }

  sendMessage() {
    this.loading = true;
    this.msgService.create(
      {
        title: this.messageForm.value.title,
        message: this.messageForm.value.message,
        activities: this.jobTags.toString()
      },
      JSON.parse(window.localStorage.getItem('user_rede_credenciados')).token)
      .subscribe(
        _ => {
          this.router.navigate([{ outlets: { message: ['solicitation-message'] }}]);
          this.messageForm.reset();
          this.jobTags = [];
          this.loading = false;
        },
        _ => {
          this.router.navigate([{ outlets: { error: ['error-message'] }}]);
          this.loading = false;
        }
      );
  }

}
