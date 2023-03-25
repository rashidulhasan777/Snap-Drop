export interface ImageInterface {
  _id?: string;
  photoSize: string;
  orgFilename: string;
  apiFilename?: string;
  copies: number;
  imageURL: string;
  approved: boolean;
  typeOfImage: 'passport' | 'gallery';
  instructionsForRetake?: string;
}
