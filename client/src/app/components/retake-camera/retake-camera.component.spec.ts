import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetakeCameraComponent } from './retake-camera.component';

describe('RetakeCameraComponent', () => {
  let component: RetakeCameraComponent;
  let fixture: ComponentFixture<RetakeCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetakeCameraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetakeCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
