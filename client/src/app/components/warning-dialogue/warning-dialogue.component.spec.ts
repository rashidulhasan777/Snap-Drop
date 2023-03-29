import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarningDialogueComponent } from './warning-dialogue.component';

describe('WarningDialogueComponent', () => {
  let component: WarningDialogueComponent;
  let fixture: ComponentFixture<WarningDialogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarningDialogueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarningDialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
