import { Details } from './details.interface';
import { ImageInterface } from './image.interface';

export interface Order {
  labId: string;
  customerId?: string;
  parcelId?: string;
  orderStatus?: string;
  orderDelivaryDetails?: Details;
  instruction?: string;
  passportPictures?: ImageInterface[];
  galleryPictures?: ImageInterface[];
  createdAt?: Date;
  updatedAt?: Date;
}
