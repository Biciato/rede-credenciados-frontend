import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReceiveComponent } from './to-receive.component';

describe('ToReceiveComponent', () => {
  let component: ToReceiveComponent;
  let fixture: ComponentFixture<ToReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
