import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportPhotoInstructionsComponent } from './passport-photo-instructions.component';

describe('PassportPhotoInstructionsComponent', () => {
  let component: PassportPhotoInstructionsComponent;
  let fixture: ComponentFixture<PassportPhotoInstructionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassportPhotoInstructionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassportPhotoInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
