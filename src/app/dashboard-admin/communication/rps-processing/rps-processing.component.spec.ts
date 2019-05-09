import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpsProcessingComponent } from './rps-processing.component';

describe('RpsProcessingComponent', () => {
  let component: RpsProcessingComponent;
  let fixture: ComponentFixture<RpsProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpsProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpsProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
