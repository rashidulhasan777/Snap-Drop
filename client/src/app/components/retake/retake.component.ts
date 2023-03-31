import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { Order } from 'src/app/interfaces/order.interface';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { IdbServiceService } from 'src/app/services/idbService/idb-service.service';
import { OrderService } from 'src/app/services/orders/order.service';

@Component({
  selector: 'app-retake',
  templateUrl: './retake.component.html',
  styleUrls: ['./retake.component.css'],
})
export class RetakeComponent {
  currentOrder?: Order;
  passportPicturesToRetake: ImageInterface[] = [];
  constructor(
    private orderService: OrderService,
    private router: Router,
    private idbService: IdbServiceService,
    private cloudinaryService: CloudinaryService
  ) {}

  async ngOnInit() {
    this.orderService.getCustomerLatestOrder().subscribe(async (res) => {
      this.currentOrder = res;
      let pImages: ImageInterface[] | undefined =
        await this.idbService.getRetakePhotos();
      if (!pImages) pImages = res.passportPictures;
      if (!pImages) this.router.navigate(['user-dashboard']);
      else
        pImages.forEach((pic) => {
          if (!pic.approved) this.passportPicturesToRetake.push(pic);
        });
      if (!this.passportPicturesToRetake.length)
        this.router.navigate(['user-dashboard']);
    });
  }
  retake(id: string) {
    this.router.navigate(['retake/' + id]);
  }

  async updateOrder() {
    const uploadSubsription: Observable<any>[] = [];
    const picToUpload: string[] = [];
    this.passportPicturesToRetake.forEach((pic) => {
      if (!pic.approved) {
        picToUpload.push(pic._id || '');
        uploadSubsription.push(
          this.cloudinaryService.cloudUpload(
            pic.imageURL,
            pic.orgFilename,
            this.currentOrder?.order_id || '',
            this.currentOrder?.labId || 0,
            'passport'
          )
        );
      }
    });
    const zipSubs = zip(...uploadSubsription);
    zipSubs.subscribe((res) => {
      res.forEach((cloud: any, idx: number) => {
        this.passportPicturesToRetake.forEach((el) => {
          if (picToUpload[idx] === el._id) {
            el.imageURL = cloud.secure_url;
          }
        });
      });
      this.orderService
        .updateOrder(
          this.currentOrder?._id || '',
          this.passportPicturesToRetake
        )
        .subscribe(async () => {
          await this.idbService.resolveRetake();
          this.router.navigate(['user_dashboard']);
        });
    });
  }
}
