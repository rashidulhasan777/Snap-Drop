import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-passport-photo-instructions',
  templateUrl: './passport-photo-instructions.component.html',
  styleUrls: ['./passport-photo-instructions.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
})
export class PassportPhotoInstructionsComponent {
  firstFormGroup = this._formBuilder.group({});
  secondFormGroup = this._formBuilder.group({});
  thirdFormGroup = this._formBuilder.group({});

  constructor(
    private _formBuilder: FormBuilder,
    private loading: LoaderService
  ) {
    this.loading.setBlockNavbar(false);
  }

  bulbOptions: AnimationOptions = {
    path: '../../../assets/121112-bulb.json',
  };

  attireOptions: AnimationOptions = {
    path: '../../../assets/144444-formal-attire.json',
  };

  captureOptions: AnimationOptions = {
    path: '../../../assets/133253-record-video-selfie-with-steps.json',
  };
}
