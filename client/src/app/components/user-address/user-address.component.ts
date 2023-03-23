import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PathaoService } from 'src/app/services/pathao/pathao.service';
import { UserdataService } from 'src/app/services/userdata.service';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.css'],
})
export class UserAddressComponent {
  @ViewChild('userEmail') emailInput!: ElementRef;
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
    address: ['', [Validators.required]],
    city: [{ city_id: 0, city_name: '' }, [Validators.required]],
    zone: [{ zone_id: 0, zone_name: '' }, [Validators.required]],
    area: [{ area_id: 0, area_name: '' }, [Validators.required]],
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
    private userDataService: UserdataService
  ) {}
  ngOnInit() {
    this.userDataService.getUser().subscribe((res) => {
      const emailField = this.emailInput.nativeElement as HTMLInputElement;
      emailField.value = res.email;
      if (res.details) {
        res.details.contact_number = res.details.contact_number.slice(5);
        this.deliveryInfoForm.patchValue(res.details);
      } else if (res.name) {
        this.name?.setValue(res.name);
      }
    });
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
      this.userDataService
        .updateUserData(details)
        .subscribe((res) => console.log(res));
      // localStorage.setItem('userDetails', JSON.stringify(details));
    }
  }
}
