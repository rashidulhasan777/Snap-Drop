import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  rootUrl = 'https://api.cloudinary.com/v1_1/djxuxbxet/image/upload';
  constructor(private http: HttpClient) {}
  cloudUpload(file: File, filename: string) {
    const public_id = filename + '_' + Date.now();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('upload_preset', 'SnapDrop');
    formData.append('public_id', public_id);

    return this.http.post(this.rootUrl, formData);
  }
}
