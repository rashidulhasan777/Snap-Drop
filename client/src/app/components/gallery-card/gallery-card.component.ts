import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css'],
})
export class GalleryCardComponent {
  @Input() preview!: File;
  @Output() imageinfo: EventEmitter<{ size: string; copies: number }> =
    new EventEmitter();

  image: Image = { copies: 1, photoSize: '4R', imageURL: '' };

  imageForm = this.fb.group({
    size: ['4R'],
    copies: [1, Validators.required],
  });

  formatOptions: string[] = ['4R', '6R', '8R'];
  filteredFormatOptions?: Observable<string[]>;

  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.image.imageURL = this.preview;
    this.filteredFormatOptions = this.imageForm.controls.size.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    // console.log(this.preview);
    this.imageForm.valueChanges.subscribe(({ size, copies }) => {
      if (size && copies) this.imageinfo.emit({ size, copies });
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.formatOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
