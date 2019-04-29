import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayedUsedComponent } from './payed-used.component';

describe('PayedUsedComponent', () => {
  let component: PayedUsedComponent;
  let fixture: ComponentFixture<PayedUsedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayedUsedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayedUsedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
