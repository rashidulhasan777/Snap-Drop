import { Details } from './details.interface';

export interface Lab {
  _id: string;
  labName: string;
  labId: number;
  labDetails: Details;
  lat: number;
  long: number;
}
