import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseBackendURL } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  rootUrl = 'https://api.cloudinary.com/v1_1/dk3znnsme/image/upload';
  constructor(private http: HttpClient) {}
  cloudUpload(
    file: File | string,
    filename: string,
    order_Id: string,
    lab_Id: number,
    photoType: string
  ) {
    const public_id = `${order_Id}_lab${lab_Id}/${photoType}/${filename}`;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'SnapDrop');
    formData.append('public_id', public_id);

    return this.http.post(this.rootUrl, formData);
  }
  getCloudDownloadURL(order_id: number, lab_id: number) {
    return this.http.post(`${baseBackendURL}/download_photos`, {
      order_id,
      lab_id,
    });
  }
}
