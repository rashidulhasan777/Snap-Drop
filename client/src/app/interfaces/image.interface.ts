export interface ImageInterface {
  photoSize: string;
  orgFilename: string;
  apiFilename?: string;
  copies: number;
  imageURL: string;
  approved: boolean;
  typeOfImage: 'passport' | 'gallery';
}
