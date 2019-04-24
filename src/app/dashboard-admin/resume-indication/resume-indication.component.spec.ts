import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeIndicationComponent } from './resume-indication.component';

describe('ResumeIndicationComponent', () => {
  let component: ResumeIndicationComponent;
  let fixture: ComponentFixture<ResumeIndicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumeIndicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeIndicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
