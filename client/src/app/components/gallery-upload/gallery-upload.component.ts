import { Component } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith, of } from 'rxjs';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogueComponent } from '../warning-dialogue/warning-dialogue.component';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.css'],
})
export class GalleryUploadComponent {
  formatOptions: string[] = ['4R', '6R', '8R', '10R'];
  formatOptionsObservable = of(['']);
  previews: { filename: string; data: string }[] = [];
  pictureData = this.fb.array<FormGroup>([]);

  applyToAllForm = this.fb.group({
    size: ['4R', Validators.required, [this.choseWithinOptions()]],
    copies: [1, [Validators.required, Validators.min(1)]],
  });

  filteredFormatOptions?: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private idbService: IdbServiceService,
    private warning: MatDialog,
    private loading: LoaderService
  ) {
    this.loading.setLoadingMsg('');
    this.loading.setLoading(true);
  }

  async ngOnInit() {
    this.formatOptionsObservable = of(this.formatOptions);
    try {
      const inCart = (await this.idbService.getGalleryPhotos()) || [];
      inCart.forEach((el) => {
        this.previews.push({ filename: el.orgFilename, data: el.imageURL });
        this.pictureData.push(
          this.fb.group({
            copies: [el.copies, [Validators.required, Validators.min(1)]],
            size: [
              el.photoSize,
              [Validators.required],
              [this.choseWithinOptions()],
            ],
          })
        );
      });
      this.loading.setLoading(false);
    } catch (error) {
      console.log(error);
    }
    this.filteredFormatOptions = this.applyToAllForm.controls?.[
      'size'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.formatOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  choseWithinOptions(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.formatOptionsObservable.pipe(
        map((val) => (val.includes(control.value) ? null : { wrongData: true }))
      );
    };
  }

  warningDialog() {
    this.warning.open(WarningDialogueComponent, {
      width: '250px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms',
    });
  }

  showPreview(event: Event) {
    const selectedFiles = (event.target as HTMLInputElement).files;
    this.loading.setLoading(true);
    // returns a file list
    if (selectedFiles && selectedFiles[0]) {
      let numberOfFiles = selectedFiles.length;
      if (numberOfFiles + this.previews.length > 20) {
        this.warningDialog();
        numberOfFiles = 20 - this.previews.length;
      }
      for (let i = 0; i < numberOfFiles; ++i) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let data = e.target.result;
          // base 64 url returned
          if (this.previews.some((el) => el.filename === selectedFiles[i].name))
            return;
          this.previews.push({ filename: selectedFiles[i].name, data });
          this.pictureData.push(
            this.fb.group({
              size: ['4R', [Validators.required], [this.choseWithinOptions()]],
              copies: [1, [Validators.required, Validators.min(1)]],
            })
          );
          this.loading.setLoading(false);
        };
        reader.readAsDataURL(selectedFiles[i]);
      }
    }
  }

  async handleSubmit() {
    if (!this.pictureData.valid) return;
    try {
      this.loading.setLoading(true);
      await this.idbService.removeAllGalleryPhotos();
      this.previews.forEach(async (el, idx) => {
        const { size, copies } = this.pictureData.at(idx).value;
        const thisPic: ImageInterface = {
          photoSize: size || '4R',
          orgFilename: el.filename,
          imageURL: el.data,
          copies,
          approved: true,
          typeOfImage: 'gallery',
        };
        try {
          await this.idbService.addAGalleryPhoto(thisPic);
        } catch (error) {
          console.log(error);
        }
      });
      this.router.navigate(['cart']);
    } catch (error) {
      console.log(error);
    }
  }

  async removeImage(index: number) {
    try {
      await this.idbService.removeOneGalleryPhoto(index);
      this.previews.splice(index, 1);
      this.pictureData.removeAt(index);
    } catch (error) {
      console.log(error);
    }
  }
  applyToAll() {
    if (this.applyToAllForm.valid)
      for (let i = 0; i < this.pictureData.length; i++) {
        this.pictureData.at(i).patchValue(this.applyToAllForm.value);
      }
  }
}
