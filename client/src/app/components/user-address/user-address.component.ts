import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Details } from 'src/app/interfaces/details.interface';
import { User } from 'src/app/interfaces/user.interface';
import { PathaoService } from 'src/app/services/pathao/pathao.service';
import { UserdataService } from 'src/app/services/userdata/userdata.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css'],
})
export class UserAddressComponent {
  hasPreviousInfo: boolean = false;
  User?: User;

  deliveryInfoForm = this.fb.group({
    name: ['', [Validators.required]],
    contact_number: [
      '',
      [
        Validators.required,
        Validators.pattern(/[0-9]/),
        Validators.maxLength(10),
        Validators.minLength(10),
      ],
    ],
    address: ['', [Validators.required, Validators.min(10)]],
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

  constructor(
    private fb: FormBuilder,
    private pathao: PathaoService,
    private userDataService: UserdataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userDataService.getUser().subscribe((res) => {
      this.User = res;
      if (res.details) {
        this.hasPreviousInfo = true;
      } else {
        this.name?.setValue(res.name || '');
        this.hasPreviousInfo = false;
      }
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
  get name() {
    return this.deliveryInfoForm.get('name');
  }
  get contact_number() {
    return this.deliveryInfoForm.get('contact_number');
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
    if (this.deliveryInfoForm.valid) {
      const details = JSON.parse(JSON.stringify(this.deliveryInfoForm.value));
      details.contact_number = '+880' + details.contact_number;
      this.userDataService.updateUserData(details).subscribe((res) => {
        this.router.navigate(['order_summary']);
      });
      // localStorage.setItem('userDetails', JSON.stringify(details));
    }
  }
  changeAdress() {
    this.hasPreviousInfo = false;
  }

  continueWithPrevious() {
    this.router.navigate(['order_summary']);
  }
}
