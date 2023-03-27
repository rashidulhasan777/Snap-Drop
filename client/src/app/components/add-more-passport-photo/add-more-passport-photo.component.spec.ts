import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMorePassportPhotoComponent } from './add-more-passport-photo.component';

describe('AddMorePassportPhotoComponent', () => {
  let component: AddMorePassportPhotoComponent;
  let fixture: ComponentFixture<AddMorePassportPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMorePassportPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMorePassportPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
