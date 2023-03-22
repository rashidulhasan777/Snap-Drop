import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllImagesPreviewComponent } from './all-images-preview.component';

describe('AllImagesPreviewComponent', () => {
  let component: AllImagesPreviewComponent;
  let fixture: ComponentFixture<AllImagesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllImagesPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllImagesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
