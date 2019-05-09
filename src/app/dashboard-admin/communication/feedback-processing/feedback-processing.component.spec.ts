import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackProcessingComponent } from './feedback-processing.component';

describe('FeedbackProcessingComponent', () => {
  let component: FeedbackProcessingComponent;
  let fixture: ComponentFixture<FeedbackProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
