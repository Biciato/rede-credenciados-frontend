import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { ArquivoService } from '../services/arquivo/arquivo.service';

import { environment } from '../../environments/environment';

import { interval } from 'rxjs';
import { map, retryWhen } from 'rxjs/operators';

@Component({
  selector: 'app-slider',
  template: `
    <div>
      <!--> Images of Carousel -->
      <img [src]="currentSlide" alt="image-carrousel" @myInsertRemoveTrigger *ngIf="currentSlide === slideHome[0]">
      <img [src]="currentSlide" alt="image-carrousel" @myInsertRemoveTrigger *ngIf="currentSlide === slideHome[1]">
      <img [src]="currentSlide" alt="image-carrousel" @myInsertRemoveTrigger *ngIf="currentSlide === slideHome[2]">
      <img [src]="currentSlide" alt="image-carrousel" @myInsertRemoveTrigger *ngIf="currentSlide === slideHome[3]">
      <img [src]="currentSlide" alt="image-carrousel" @myInsertRemoveTrigger *ngIf="currentSlide === slideHome[4]">
      <!--> Carousel Buttons -->
      <a herf="#">
        <span>
          <i class="fas fa-angle-right" (click)="forward()"></i>
        </span>
      </a>
      <a herf="#">
        <span>
          <i class="fas fa-angle-left" (click)="reward()"></i>
        </span>
      </a>
      <!--> Carousel display active -->
      <ul>
        <li><i [ngClass]="currentSlideClass[0]"></i></li>
        <li><i [ngClass]="currentSlideClass[1]"></i></li>
        <li><i [ngClass]="currentSlideClass[2]"></i></li>
        <li><i [ngClass]="currentSlideClass[3]"></i></li>
        <li><i [ngClass]="currentSlideClass[4]"></i></li>
      </ul>
  </div>
  <div class="my-container">
    <ng-template #customLoadingTemplate>
      <div class="custom-class">
        <h3>
          Loading...
        </h3>
      </div>
    </ng-template>

    <ngx-loading [show]="loading" [config]="{ backdropBorderRadius: '3px' }" [template]="customLoadingTemplate"></ngx-loading>
  </div>
  `,
  styleUrls: ['slider.component.scss'],
  animations: [
    trigger('myInsertRemoveTrigger', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ])
    ])
  ]
})

export class SliderComponent implements OnInit {

    // Property to set current slide image
  currentSlide: string;
  // Array of i class
  currentSlideClass: string[];
  loading = false;
  // Array of Home Image urls
  slideHome = [];
  url = environment.baseUrlArquivos;

  constructor(private arqService: ArquivoService) {
    // setting i classes and initing the first one to me fas rather than far
    this.currentSlideClass = [
      'fas fa-circle',
      'far fa-circle',
      'far fa-circle',
      'far fa-circle',
      'far fa-circle'
    ];
  }

  ngOnInit() {
    this.loading = true;
    this.arqService.slideImgIdx().subscribe(imgs => this.setSlideImgs(imgs), () => this.loading = false);
    this.currentSlide = this.url + 'slide-imagens/1profissional.jpg';
  }

  setSlideImgs(imgs) {
    this.loading = false;
    this.slideHome = [];
    imgs.forEach(el => {
      this.slideHome.push(this.url + el);
    });
    this.startCarousel(this.slideHome);
  }

  startCarousel(slideHome) {
    // Obsevable to rotate image carousel
    const source = interval(5000);
    // Handling Observable to reset when it finishes
    const mySubscribe = source.pipe(
      map(val => {

        this.currentSlideClass[0] = 'far fa-circle';
        this.currentSlideClass[1] = 'far fa-circle';
        this.currentSlideClass[2] = 'far fa-circle';
        this.currentSlideClass[3] = 'far fa-circle';
        this.currentSlideClass[4] = 'far fa-circle';
        this.currentSlideClass[val] = 'fas fa-circle';

        if (val > 4) {
          this.currentSlideClass[4] = 'fas fa-circle';
          // error will be picked up by retryWhen
          throw val;
        }
        return val;
      }),
      retryWhen(errors => errors)
      );
    // subscribing the Obsevable
    mySubscribe.subscribe(val => this.currentSlide = slideHome[val]);
  }

  // method that forwards image carousel
  forward() {
    let currentSlideIdx = this.slideHome.indexOf(this.currentSlide);

    if (currentSlideIdx === 4) {
      this.currentSlideClass[4] = 'far fa-circle';
      currentSlideIdx = -1;
    }

    const forwardIdx = currentSlideIdx + 1;

    this.currentSlide = this.slideHome[forwardIdx];
    this.currentSlideClass[forwardIdx] = 'fas fa-circle';
    this.currentSlideClass[currentSlideIdx] = 'far fa-circle';
  }

  // method that rewards image carousel
  reward() {
    let currentSlideIdx = this.slideHome.indexOf(this.currentSlide);

    if (currentSlideIdx === 0) {
      this.currentSlideClass[0] = 'far fa-circle';
      currentSlideIdx = 5;
    }

    const rewardIdx = currentSlideIdx - 1;

    this.currentSlide = this.slideHome[rewardIdx];
    this.currentSlideClass[rewardIdx] = 'fas fa-circle';
    this.currentSlideClass[currentSlideIdx] = 'far fa-circle';
  }
}
