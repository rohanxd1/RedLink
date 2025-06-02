import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrgentlogsComponent } from './urgentlogs.component';

describe('UrgentlogsComponent', () => {
  let component: UrgentlogsComponent;
  let fixture: ComponentFixture<UrgentlogsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UrgentlogsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrgentlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
