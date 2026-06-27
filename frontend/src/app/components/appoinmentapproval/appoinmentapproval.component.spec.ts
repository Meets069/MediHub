import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentapprovalComponent } from './appoinmentapproval.component';

describe('AppoinmentapprovalComponent', () => {
  let component: AppoinmentapprovalComponent;
  let fixture: ComponentFixture<AppoinmentapprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentapprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentapprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
