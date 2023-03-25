import { Details } from './details.interface';

export interface Lab {
  labName: string;
  labId: number;
  labDetails: Details;
  lat: number;
  long: number;
}
