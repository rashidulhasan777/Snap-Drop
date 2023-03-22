import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { PathaoService } from 'src/app/services/pathao/pathao.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css'],
})
export class UserAddressComponent {
  deliveryInfoForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/[0-9]/)]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    zone: ['', [Validators.required]],
    area: ['', [Validators.required]],
  });

  cities: { city_id: number; city_name: string }[] = [
    { city_id: 1, city_name: 'Dhaka' },
    { city_id: 2, city_name: 'Chittagong' },
  ];

  zones: { zone_id: number; zone_name: string }[] = [];
  areas: { area_id: number; area_name: string }[] = [];

  constructor(private fb: FormBuilder, private pathao: PathaoService) {}

  ngOnInit() {
    this.pathao.getPathaoAccessToken().subscribe({
      next: (res) => {
        localStorage.setItem(
          'pathaoAccessToken',
          JSON.stringify(res.pathaoToken)
        );
      },
    });

    this.city?.valueChanges.subscribe((cityVal: any) => {
      this.pathao.getPathaoZone(cityVal.city_id).subscribe({
        next: (res: any) => {
          this.zones = res.zones;
        },
      });
    });

    this.zone?.valueChanges.subscribe((zoneVal: any) => {
      this.pathao.getPathaoArea(zoneVal.zone_id).subscribe({
        next: (res: any) => {
          this.areas = res.areas;
        },
      });
    });
  }

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

  handleSubmit() {
    if(this.deliveryInfoForm.valid){

      const res = JSON.parse(JSON.stringify(this.deliveryInfoForm.value));
      res.phone = '+880' + res.phone;
      localStorage.setItem('userDetails', JSON.stringify(res));
    }
  }
}
