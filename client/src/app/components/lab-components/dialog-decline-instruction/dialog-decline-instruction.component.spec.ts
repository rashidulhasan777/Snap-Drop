import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeclineInstructionComponent } from './dialog-decline-instruction.component';

describe('DialogDeclineInstructionComponent', () => {
  let component: DialogDeclineInstructionComponent;
  let fixture: ComponentFixture<DialogDeclineInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeclineInstructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeclineInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
