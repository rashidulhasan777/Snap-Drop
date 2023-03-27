import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith, of } from 'rxjs';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { UserdataService } from 'src/app/services/userdata/userdata.service';

@Component({
  selector: 'app-add-more-passport-photo',
  templateUrl: './add-more-passport-photo.component.html',
  styleUrls: ['./add-more-passport-photo.component.css'],
})
export class AddMorePassportPhotoComponent implements OnInit {
  passportPhotos: ImageInterface[] = [];
  countries: string[] = [];
  filteredOptions!: Observable<string[]>;
  anotherOne: Observable<string[]> = of([]);
  countryAndCopiesInfo = this.fb.group({
    country: ['', [Validators.required, this.choseWithinOptions]],
    copies: [1, [Validators.required, Validators.min(1)]],
  });
  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private router: Router,
    private userData: UserdataService
  ) {
    this.userData.getCountries().subscribe((res) => {
      this.countries = res;
      this.anotherOne = of(res);
    });
    cartService.getCart().subscribe((res) => {
      this.passportPhotos = res.passportPictures || [];
    });
  }

  ngOnInit(): void {
    const prevValue = JSON.parse(
      localStorage.getItem('countryAndCopiesForPassport') || '""'
    );
    this.countryAndCopiesInfo.patchValue(prevValue);
    this.filteredOptions =
      this.countryAndCopiesInfo.controls.country.valueChanges.pipe(
        startWith(''),
        map((value) => this.fiterCountries(value || ''))
      );
  }

  private fiterCountries(contryName: string) {
    const filter = contryName.toLowerCase();
    return this.countries.filter((el) => el.toLowerCase().includes(filter));
  }

  choseWithinOptions(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.anotherOne.pipe(
        map((val) => (val.includes(control.value) ? null : { wrongData: true }))
      );
    };
  }
  removePicture(idx: number) {
    this.passportPhotos.splice(idx, 1);
  }
  proceed() {
    if (this.countryAndCopiesInfo.valid) {
      localStorage.setItem(
        'countryAndCopiesForPassport',
        JSON.stringify(this.countryAndCopiesInfo.value)
      );
      this.cartService
        .updateCart({ passportPictures: this.passportPhotos })
        .subscribe((res) => {
          this.router.navigate(['cart']);
        });
    }
  }
}
