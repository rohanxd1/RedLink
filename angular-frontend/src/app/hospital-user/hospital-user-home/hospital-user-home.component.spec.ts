import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalUserHomeComponent } from './hospital-user-home.component';

describe('HospitalUserHomeComponent', () => {
  let component: HospitalUserHomeComponent;
  let fixture: ComponentFixture<HospitalUserHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalUserHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalUserHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
