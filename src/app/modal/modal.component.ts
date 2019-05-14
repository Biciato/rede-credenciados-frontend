import { Component, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  template:
    `<div class="app-modal">
      <div class="app-modal-body">
        <ng-content></ng-content>
      </div>
    </div>
    <div class="app-modal-background"></div>`,
  styleUrls: ['modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  @Output() stateName = new EventEmitter<string>();

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    const modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'app-modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(id): void {
    this.element.style.display = 'flex';
    document.body.classList.add('app-modal-open');
    if (id === 'modal-cotacao') {
      this.element.childNodes[0].id = 'solicModal';
    }
    if (id === 'modal-propaganda-cidades') {
      this.element.childNodes[0].id = 'modalPropaganda';
    }
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('app-modal-open');
  }

  getState(state) {
    // sends state name to the parent component via Observable
    this.stateName.emit(state);
  }
}
