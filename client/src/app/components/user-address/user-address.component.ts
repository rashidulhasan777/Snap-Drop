import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { Details } from 'src/app/interfaces/details.interface';
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
  isZoneDisabled: boolean = true;
  isAreaDisabled: boolean = true;

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

  filteredCities?: Observable<{ city_id: number; city_name: string }[]>;
  filteredZones?: Observable<{ zone_id: number; zone_name: string }[]>;
  filteredAreas?: Observable<{ area_id: number; area_name: string }[]>;

  constructor(
    private fb: FormBuilder,
    private pathao: PathaoService,
    private userDataService: UserdataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.disableArea(true);
    this.disableZone(true);
    this.userDataService.getUser().subscribe((res) => {
      this.User = res;
      if (res.details) {
        this.hasPreviousInfo = true;
      } else {
        this.name?.setValue(res.name || '');
        this.hasPreviousInfo = false;
      }
    });

    this.filteredCities = this.city?.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCity(value || ''))
    );
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

  setZones(city: string) {
    const cityObj = this.cities.find((ct) => ct.city_name === city)!;
    this.pathao.getPathaoZone(cityObj.city_id).subscribe({
      next: (res: any) => {
        this.zones = res.zones;
        this.disableZone(false);
        this.filteredZones = this.zone?.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterZone(value || ''))
        );
      },
    });
  }

  setAreas(zone: string) {
    const zoneObj = this.zones.find((zn) => zn.zone_name === zone)!;
    this.pathao.getPathaoArea(zoneObj.zone_id).subscribe({
      next: (res: any) => {
        this.areas = res.areas;
        this.disableArea(false);
        this.filteredAreas = this.area?.valueChanges.pipe(
          startWith(''),
          map((value) => this._filterArea(value || ''))
        );
      },
    });
  }

  handleSubmit() {
    if (this.deliveryInfoForm.valid) {
      const details = JSON.parse(JSON.stringify(this.deliveryInfoForm.value));
      details.contact_number = '+880' + details.contact_number;
      this.userDataService.updateUserData(details).subscribe((res) => {
        this.router.navigate(['order_summary']);
      });
    }
  }
  changeAdress() {
    this.hasPreviousInfo = false;
  }

  continueWithPrevious() {
    this.router.navigate(['order_summary']);
  }

  private _filterCity(value: string): { city_id: number; city_name: string }[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter((city) =>
      city.city_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterZone(value: string): { zone_id: number; zone_name: string }[] {
    const filterValue = value.toLowerCase();
    return this.zones.filter((zone) =>
      zone.zone_name.toLowerCase().includes(filterValue)
    );
  }

  private _filterArea(value: string): { area_id: number; area_name: string }[] {
    const filterValue = value.toLowerCase();
    return this.areas.filter((area) =>
      area.area_name.toLowerCase().includes(filterValue)
    );
  }

  disableZone(val: boolean) {
    if (val) this.deliveryInfoForm.controls['zone'].disable();
    else this.deliveryInfoForm.controls['zone'].enable();
  }
  disableArea(val: boolean) {
    if (val) this.deliveryInfoForm.controls['area'].disable();
    else this.deliveryInfoForm.controls['area'].enable();
  }
}
