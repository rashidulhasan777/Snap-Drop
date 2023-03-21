import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css'],
})
export class UserAddressComponent {
  deliveryInfoForm = this.fb.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    zone: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
  });
  constructor(private fb: FormBuilder) {}

  get email() {
    return this.deliveryInfoForm.get('email');
  }
  get name() {
    return this.deliveryInfoForm.get('name');
  }
  get phone() {
    return this.deliveryInfoForm.get('phone');
  }
  get address() {
    return this.deliveryInfoForm.get('address');
  }
  get city() {
    return this.deliveryInfoForm.get('city');
  }
  get zone() {
    return this.deliveryInfoForm.get('zone');
  }
  get area() {
    return this.deliveryInfoForm.get('area');
  }

  handleSubmit() {}
}
