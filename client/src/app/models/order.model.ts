import { Image } from './image.model';

export interface Order {
  _id: string;
  labId?: string;
  customerId?: string;
  orderStatus: string;
  orderDate: Date;
  instruction?: string;
  pictures: Image[];
  orderType: string;
}
