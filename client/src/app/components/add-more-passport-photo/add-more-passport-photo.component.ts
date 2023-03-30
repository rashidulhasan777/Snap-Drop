import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable, startWith, of } from 'rxjs';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { CartService } from 'src/app/services/cart/cart.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { UserdataService } from 'src/app/services/userdata/userdata.service';
import { WarningDialogueComponent } from '../warning-dialogue/warning-dialogue.component';

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
    country: ['', [Validators.required], [this.choseWithinOptions()]],
    copies: [4, [Validators.required, Validators.min(1)]],
  });
  constructor(
    private fb: FormBuilder,
    private idbService: IdbServiceService,
    private router: Router,
    private userData: UserdataService,
    private warning: MatDialog
  ) {
    this.userData.getCountries().subscribe((res) => {
      this.countries = res;
      this.anotherOne = of(res);
    });
  }

  async ngOnInit() {
    const prevValue = { country: '', copies: 1 };
    try {
      this.passportPhotos = (await this.idbService.getPassportPhotos()) || [];
      prevValue.country = (await this.idbService.getCountry()) || '';
      prevValue.copies = (await this.idbService.getPassportCopies()) || 1;
    } catch (err) {
      console.log(err);
    }

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
  async removePicture(idx: number) {
    try {
      await this.idbService.removeOnePassportPhoto(idx);
      this.passportPhotos.splice(idx, 1);
    } catch (err) {
      console.log(err);
    }
  }
  async proceed() {
    try {
      if (this.countryAndCopiesInfo.valid) {
        await this.idbService.setCountry(
          this.countryAndCopiesInfo.value.country || ''
        );
        await this.idbService.setPassportCopies(
          this.countryAndCopiesInfo.value.copies || 1
        );
        this.router.navigate(['cart']);
      }
    } catch (err) {
      console.log(err);
    }
  }
  warningDialog() {
    this.warning.open(WarningDialogueComponent, {
      width: '250px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
  }
  checkLimit() {
    if (this.passportPhotos.length >= 20) {
      this.warningDialog();
    } else {
      this.router.navigate(['camera']);
    }
  }
}
