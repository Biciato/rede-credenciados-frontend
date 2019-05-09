import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RpsReportComponent } from './rps-report.component';

describe('RpsReportComponent', () => {
  let component: RpsReportComponent;
  let fixture: ComponentFixture<RpsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RpsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RpsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
