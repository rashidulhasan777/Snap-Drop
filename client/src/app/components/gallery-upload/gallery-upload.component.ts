import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.css'],
})
export class GalleryUploadComponent {
  previews: File[] = [];

  constructor(private fb: FormBuilder) {}

  uploadForm = this.fb.group({
    avatar: [null],
    name: [''],
  });

  showPreview(event: Event) {
    // console.log(event);
    const selectedFiles = (event.target as HTMLInputElement).files;
    // console.log(files); // returns a file list
    if (selectedFiles && selectedFiles[0]) {
      const numberOfFiles = selectedFiles.length;
      // console.log(numberOfFiles);
      for (let i = 0; i < numberOfFiles; ++i) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          let imageData = e.target.result;
          // console.log(imageData); // base 64 url returned
          this.previews.push(imageData);
        };
        reader.readAsDataURL(selectedFiles[i]);
      }
    }
  }
}
