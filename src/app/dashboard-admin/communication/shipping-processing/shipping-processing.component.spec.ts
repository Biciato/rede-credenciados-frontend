import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingProcessingComponent } from './shipping-processing.component';

describe('ShippingProcessingComponent', () => {
  let component: ShippingProcessingComponent;
  let fixture: ComponentFixture<ShippingProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippingProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
