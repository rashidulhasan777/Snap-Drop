import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-facebook-photo',
  templateUrl: './facebook-photo.component.html',
  styleUrls: ['./facebook-photo.component.css']
})
export class FacebookPhotoComponent implements OnInit {
  before!: string;
  after!: string;
  photoLinks: string[] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getFacebookPhotos();
  }
  // https://graph.facebook.com/v18.0/7225892580808922/photos?access_token=${localStorage.getItem('fbAccessToken')}&fields=images&limit=10&pretty=0&after=${this.after}
  getFacebookPhotos() {
    this.httpClient.get('https://graph.facebook.com/v11.0/me/photos?fields=images&access_token=' + localStorage.getItem('fbAccessToken')).subscribe((res: any) => {
      console.log(res);
      this.updatePhotoLinks(res);
    });
  }
  updatePhotoLinks(res: any) {
    res.data.forEach((element: any) => {
      this.photoLinks.push(element.images[0].source);
    });
    // console.log(this.photoLinks);

    this.before = res.paging.cursors.before;
    this.after = res.paging.cursors.after;
    console.log(this.before);

  }
  onClickNext() {
    this.getFacebookPhotosAfter(this.after);
  }
  onClickPrev() {
    this.getFacebookPhotosBefore(this.before);
  }
  // me/photos?fields=images&pretty=0&limit=25&before=QVFIUm40R05jU1pmbzV2OWU4NmU1SGppbFBKbEQtNi1pTGw3UzZA5ekwyYmkyaW5HSlI1UXN1SWEwZA0NhSm1xSXh3MnlfM2lOTWhwdEZAaNGtISUthdUVBdVR3
  getFacebookPhotosAfter(after: string) {
    this.httpClient.get(`https://graph.facebook.com/v18.0/me/photos?fields=images&pretty=0&limit=25&access_token=${localStorage.getItem('fbAccessToken')}&after=${after}`).subscribe((res: any) => {
      console.log(res);
      this.updatePhotoLinks(res);
    });
  }
  getFacebookPhotosBefore(before: string) {
    this.httpClient.get(`https://graph.facebook.com/v11.0/me/photos?fields=images&access_token=${localStorage.getItem('fbAccessToken')}&before=${before}`).subscribe((res: any) => {
      console.log(res);
      this.updatePhotoLinks(res);
    });
  }
}
