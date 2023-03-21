import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.css'],
})
export class GalleryUploadComponent {
  previews: { filename: string; data: File }[] = [];
  pictureData = this.fb.array<FormGroup>([]);

  constructor(
    private fb: FormBuilder,
    private cloudinary: CloudinaryService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.pictureData.valueChanges.subscribe((res) => console.log(res));
  }

  showPreview(event: Event) {
    const selectedFiles = (event.target as HTMLInputElement).files;
    // returns a file list
    if (selectedFiles && selectedFiles[0]) {
      const numberOfFiles = selectedFiles.length;
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
              imageName: [selectedFiles[i].name],
              size: ['4R', Validators.required],
              copies: [1],
              remoteURL: [''],
            })
          );
        };
        reader.readAsDataURL(selectedFiles[i]);
      }
    }
  }

  handleSubmit() {
    for (let i = 0; i < this.previews.length; ++i) {
      this.cloudinary
        .cloudUpload(this.previews[i].data, this.previews[i].filename)
        .subscribe({
          next: (res: any) => {
            this.pictureData.value[i].remoteURL = res.secure_url;
          },
        });
    }
  }

  removeImage(index: number) {
    this.previews = this.previews.filter(
      (el) => el.filename !== this.pictureData.at(index).value.imageName
    );
    this.pictureData.removeAt(index);
  }
}
