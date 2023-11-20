import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookPhotoComponent } from './facebook-photo.component';

describe('FacebookPhotoComponent', () => {
  let component: FacebookPhotoComponent;
  let fixture: ComponentFixture<FacebookPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacebookPhotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacebookPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
