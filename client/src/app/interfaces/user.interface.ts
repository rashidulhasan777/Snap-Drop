export interface User {
  _id: string;
  name?: string;
  email: string;
  recentOrderStatus?: string;
  typeOfUser: 'customer' | 'lab';
  profilePic?: string;
  address?: string;
  labId?: string;
}
