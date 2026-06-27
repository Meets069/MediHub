import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoinmentstatusComponent } from './appoinmentstatus.component';

describe('AppoinmentstatusComponent', () => {
  let component: AppoinmentstatusComponent;
  let fixture: ComponentFixture<AppoinmentstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppoinmentstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppoinmentstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
