import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';

@Component({
  selector: 'app-add-passport-photo',
  templateUrl: './add-passport-photo.component.html',
  styleUrls: ['./add-passport-photo.component.css'],
})
export class AddPassportPhotoComponent {
  images: { filename: string; link: string }[] = [];
  constructor(
    private fb: FormBuilder,
    private cloudinary: CloudinaryService,
    private router: Router
  ) {}
  pictureData = this.fb.array<FormGroup>([]);

  ngOnInit() {
    this.images = JSON.parse(
      localStorage.getItem('userPassportPictures') || ''
    );
    this.images.forEach((el) => {
      this.pictureData.push(
        this.fb.group({
          imageName: [el.filename],
          size: ['passport', Validators.required],
          copies: [1],
          remoteURL: [el.link],
        })
      );
    });
  }

  handleSubmit() {
    //Handle it
  }
}
