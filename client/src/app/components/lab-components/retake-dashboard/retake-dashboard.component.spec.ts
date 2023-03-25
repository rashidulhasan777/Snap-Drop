import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetakeDashboardComponent } from './retake-dashboard.component';

describe('RetakeDashboardComponent', () => {
  let component: RetakeDashboardComponent;
  let fixture: ComponentFixture<RetakeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetakeDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetakeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
