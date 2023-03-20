import { Component, Input } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-gallery-card',
  templateUrl: './gallery-card.component.html',
  styleUrls: ['./gallery-card.component.css'],
})
export class GalleryCardComponent {
  @Input() preview!: File;

  image: Image = { copies: 1, photoSize: '4R', imageURL: '' };

  formatControl = new FormControl('4R');
  formatOptions: string[] = ['4R', '6R', '8R'];
  filteredFormatOptions?: Observable<string[]>;

  constructor() {}
  ngOnInit() {
    this.image.imageURL = this.preview;
    this.filteredFormatOptions = this.formatControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    console.log(this.preview);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.formatOptions.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
