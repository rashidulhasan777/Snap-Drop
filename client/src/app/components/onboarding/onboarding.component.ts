import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class OnboardingComponent {
  firstFormGroup = this.fb.group({});
  secondFormGroup = this.fb.group({});
  thirdFormGroup = this.fb.group({});
  fourthFormGroup = this.fb.group({});
  fifthFormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}
}
