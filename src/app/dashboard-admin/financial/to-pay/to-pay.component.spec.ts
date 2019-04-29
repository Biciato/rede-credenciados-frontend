import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToPayComponent } from './to-pay.component';

describe('ToPayComponent', () => {
  let component: ToPayComponent;
  let fixture: ComponentFixture<ToPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
