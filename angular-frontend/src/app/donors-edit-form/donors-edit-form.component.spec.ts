import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorsEditFormComponent } from './donors-edit-form.component';

describe('DonorsEditFormComponent', () => {
  let component: DonorsEditFormComponent;
  let fixture: ComponentFixture<DonorsEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DonorsEditFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonorsEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
