import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassportPhotoComponent } from './add-passport-photo.component';

describe('AddPassportPhotoComponent', () => {
  let component: AddPassportPhotoComponent;
  let fixture: ComponentFixture<AddPassportPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPassportPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPassportPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
