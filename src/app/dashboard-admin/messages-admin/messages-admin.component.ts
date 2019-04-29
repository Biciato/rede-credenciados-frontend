import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivityService } from 'src/app/services/activity/activity.service';
import { ModalService } from 'src/app/services/modal/modal.service';

@Component({
  selector: 'app-messages-admin',
  templateUrl: './messages-admin.component.html',
  styleUrls: ['./messages-admin.component.scss']
})
export class MessagesAdminComponent implements OnInit {
  jobsFull = [];
  jobTags = [];
  loading = false;

  mensagemInput = new FormControl('');

  constructor(private actService: ActivityService, private modalService: ModalService) {
    this.actService.all()
      .subscribe(
          activityList => activityList.map(atividade => this.jobsFull.push(atividade)),
          () => this.loading = false,
          () => this.loading = false
      );
  }

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

}
