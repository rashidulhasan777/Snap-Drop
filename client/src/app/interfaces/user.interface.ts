import { Details } from './details.interface';

export interface User {
  _id?: string;
  name?: string;
  email: string;
  typeOfUser: 'customer' | 'lab';
  profilePic?: string;
  details?: Details;
  labId?: string;
  newUser?: boolean;
}
