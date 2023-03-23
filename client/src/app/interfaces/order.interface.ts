import { Details } from './details.interface';
import { ImageInterface } from './image.interface';
import { Price } from './price.interface';

export interface Order {
  labId: string;
  customerId?: string;
  parcelId?: string;
  orderStatus?: string;
  orderDelivaryDetails?: Details;
  instruction?: string;
  passportPictures?: ImageInterface[];
  galleryPictures?: ImageInterface[];
  totalPrice: Price;
  paid?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
