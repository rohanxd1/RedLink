import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBloodComponent } from './request-blood.component';

describe('RequestBloodComponent', () => {
  let component: RequestBloodComponent;
  let fixture: ComponentFixture<RequestBloodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestBloodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestBloodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
