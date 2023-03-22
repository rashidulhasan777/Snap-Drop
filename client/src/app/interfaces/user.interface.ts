import { Details } from "./details.interface";

export interface User {
  _id?: string;
  email: string;
  typeOfUser: 'customer' | 'lab';
  profilePic?: string;
  detaills?: Details;
  labId?: string;
}
