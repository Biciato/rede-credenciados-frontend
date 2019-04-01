import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetPasswordEmailComponent } from './forget-password-email.component';

describe('ForgetEmailComponent', () => {
  let component: ForgetPasswordEmailComponent;
  let fixture: ComponentFixture<ForgetPasswordEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetPasswordEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetPasswordEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
