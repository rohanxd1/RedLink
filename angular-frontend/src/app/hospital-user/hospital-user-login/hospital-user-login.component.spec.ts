import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUserLoginComponent } from './hospital-user-login.component';

describe('HospitalUserLoginComponent', () => {
  let component: HospitalUserLoginComponent;
  let fixture: ComponentFixture<HospitalUserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalUserLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
