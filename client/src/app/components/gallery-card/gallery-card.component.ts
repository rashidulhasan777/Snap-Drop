import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css'],
})
export class GalleryCardComponent {
  @Input() preview!: File | string;
  @Input() imageForm!: FormGroup;

  @Output() deleteImage: EventEmitter<void> = new EventEmitter();
  image: Image = { copies: 1, photoSize: '4R', imageURL: '' };

  formatOptions: string[] = ['4R', '6R', '8R', '10R'];
  filteredFormatOptions?: Observable<string[]>;

  constructor() {}
  ngOnInit() {
    this.filteredFormatOptions = this.imageForm.controls?.[
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

  removeImage() {
    this.deleteImage.emit();
  }
}
