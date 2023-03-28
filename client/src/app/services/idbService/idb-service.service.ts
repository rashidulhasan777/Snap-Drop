import { Injectable } from '@angular/core';
import {
  set,
  get,
  setMany,
  getMany,
  update,
  clear,
  entries,
  del,
} from 'idb-keyval';
import { ImageInterface } from 'src/app/interfaces/image.interface';

@Injectable({
  providedIn: 'root',
})
export class IdbServiceService {
  constructor() {}

  addAPassportPhoto(photo: ImageInterface): Promise<void> {
    console.log(photo);
    return update('passportPhotos', (val) => (val ? [...val, photo] : [photo]));
  }

  removeOnePassportPhoto(idx: number) {
    return update('passportPhotos', (val) =>
      val.filter((el: ImageInterface, i: number) => idx !== i)
    );
  }
  removeAllPassportPhotos() {
    return del('passportPhotos');
  }

  addAGalleryPhoto(photo: ImageInterface): Promise<void> {
    return update('galleryPhotos', (val) => (val ? [...val, photo] : [photo]));
  }

  removeOneGalleryPhoto(idx: number) {
    return update('galleryPhotos', (val) =>
      val.filter((el: ImageInterface, i: number) => idx !== i)
    );
  }

  removeAllGalleryPhotos() {
    return del('galleryPhotos');
  }

  getPassportPhotos(): Promise<ImageInterface[] | undefined> {
    return get('passportPhotos');
  }

  getGalleryPhotos(): Promise<ImageInterface[] | undefined> {
    return get('galleryPhotos');
  }

  setCountry(country: string): Promise<void> {
    return set('country', country);
  }

  getCountry(): Promise<string | undefined> {
    return get('country');
  }

  setPassportCopies(copies: number): Promise<void> {
    return update('passportCopies', (val) => copies);
  }

  getPassportCopies(): Promise<number | undefined> {
    return get('passportCopies');
  }

  async updatePassportPhotosWithCountry() {
    const country = await this.getCountry();
    return update('passportPhotos', (val) => {
      if (!val) return [];
      return val.map((el: ImageInterface, idx: number) => {
        el.orgFilename = `passport_${country}_x${el.copies}_${idx}`;
        return el;
      });
    });
  }
  async updateGalleryPhotosName() {
    return update('galleryPhotos', (val) => {
      if (!val) return [];
      return val.map((el: ImageInterface, idx: number) => {
        el.orgFilename = `gallery_${el.photoSize}_x${el.copies}_${idx}`;
        return el;
      });
    });
  }

  clearAll(): Promise<void> {
    return clear();
  }

  async getAllForCart(): Promise<{
    galleryPictures: ImageInterface[];
    passportPictures: ImageInterface[];
    countryForPassport: string;
  }> {
    const data = await getMany(['galleryPhotos', 'passportPhotos', 'country']);
    return {
      galleryPictures: data[0],
      passportPictures: data[1],
      countryForPassport: data[2],
    };
  }
}
