import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
// import { Details } from 'src/app/interfaces/details.interface';
import { User } from 'src/app/interfaces/user.interface';
import { LoaderService } from 'src/app/services/loader/loader.service';
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
  cityPrev: { city_id: number; city_name: string } | string = '';
  zonePrev: { zone_id: number; zone_name: string } | string = '';
  areaPrev: { area_id: number; area_name: string } | string = '';

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
    // city: new FormControl<{ city_id: number; city_name: string } | string>(''),
    city: [this.cityPrev, [Validators.required]],
    zone: [this.zonePrev, [Validators.required]],
    area: [this.areaPrev],
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
    private router: Router,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    this.loading.setLoading(true);
    this.loading.setBlockNavbar(false);
  }

  ngOnInit() {
    this.disableArea(true);
    this.disableZone(true);
    this.userDataService.getUser().subscribe((res) => {
      this.User = res;
      if (this.User.details) {
        this.hasPreviousInfo = true;
        this.User.details.contact_number =
          this.User.details?.contact_number.slice(4);
        this.deliveryInfoForm.patchValue(this.User?.details);
      } else {
        this.name?.setValue(res.name || '');
        this.hasPreviousInfo = false;
      }
      this.loading.setLoading(false);
    });

    this.filteredCities = this.city?.valueChanges.pipe(
      startWith(''),
      // map((value) => this._filterCity(value || ''))
      map((city) => {
        const name = typeof city === 'string' ? city : city?.city_name;
        return name ? this._filterCity(name as string) : this.cities.slice();
      })
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

  setZones(city: { city_id: number; city_name: string }) {
    this.loading.setLoading(true);
    this.pathao.getPathaoZone(city.city_id).subscribe({
      next: (res: any) => {
        this.zones = res.zones;
        this.loading.setLoading(false);
        this.disableZone(false);
        this.filteredZones = this.zone?.valueChanges.pipe(
          startWith(''),
          // map((value) => this._filterZone(value || ''))
          map((zone) => {
            const name = typeof zone === 'string' ? zone : zone?.zone_name;
            return name ? this._filterZone(name as string) : this.zones.slice();
          })
        );
      },
    });
  }

  setAreas(zone: { zone_id: number; zone_name: string }) {
    this.loading.setLoading(true);
    this.pathao.getPathaoArea(zone.zone_id).subscribe({
      next: (res: any) => {
        this.areas = res.areas;
        this.loading.setLoading(false);
        this.disableArea(false);
        this.filteredAreas = this.area?.valueChanges.pipe(
          startWith(''),
          map((area) => {
            const name = typeof area === 'string' ? area : area?.area_name;
            return name ? this._filterArea(name as string) : this.areas.slice();
          })
        );
      },
    });
  }

  handleSubmit() {
    if (this.deliveryInfoForm.valid) {
      this.loading.setLoading(true);
      const details = JSON.parse(JSON.stringify(this.deliveryInfoForm.value));
      details.contact_number = '+880' + details.contact_number;
      if (!details.area.area_name) delete details.area;
      this.userDataService.updateUserData(details).subscribe((res) => {
        this.loading.setLoading(false);
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
  displayFnCities(city: { city_id: number; city_name: string }) {
    return city ? city.city_name : '';
  }
  displayFnZones(zone: { zone_id: number; zone_name: string }) {
    return zone ? zone.zone_name : '';
  }
  displayFnAreas(area: { area_id: number; area_name: string }) {
    return area ? area.area_name : '';
  }
}
