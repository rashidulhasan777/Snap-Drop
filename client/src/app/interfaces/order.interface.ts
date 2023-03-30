import { Details } from './details.interface';
import { ImageInterface } from './image.interface';
import { Price } from './price.interface';

export interface Order {
  _id?: string;
  order_id: string;
  labId: number;
  customerId?: string;
  parcelId?: string;
  orderStatus?: string;
  orderDelivaryDetails?: Details;
  countryForPassport?: string;
  instruction?: string;
  passportPictures?: ImageInterface[];
  galleryPictures?: ImageInterface[];
  totalPrice: Price;
  paid?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
