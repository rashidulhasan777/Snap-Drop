import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { PendingDashboardComponent } from '../pending-dashboard/pending-dashboard.component';
import { Router } from '@angular/router';
import { ImageInterface } from 'src/app/interfaces/image.interface';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/services/orders/order.service';
import { Order } from 'src/app/interfaces/order.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-dialog-approval',
  templateUrl: './dialog-approval.component.html',
  styleUrls: ['./dialog-approval.component.css'],
})
export class DialogApprovalComponent {
  passportImages: ImageInterface[] = [];
  currentIndex = 0;
  currentImage: ImageInterface;
  imageStatuses = this.formBuiler.array<FormGroup>([]);
  instructionError = false;
  nextImageText = 'Next';
  country = '';
  constructor(
    private formBuiler: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    public dialogRef: MatDialogRef<PendingDashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Order
  ) {
    this.country = data.countryForPassport || '';
    this.passportImages = data.passportPictures || [];
    this.currentImage = this.passportImages[0];
    this.passportImages.forEach((el) => {
      this.imageStatuses.push(
        this.formBuiler.group({
          approved: el.approved,
          instruction: '',
        })
      );
    });
    if (this.passportImages.length === 1) this.nextImageText = 'Done';
    this.imageStatuses.valueChanges.pipe(take(1)).subscribe((val) => {
      val.forEach((el, idx) => {
        this.passportImages[idx].approved = el.approved;
        this.passportImages[idx].instructionsForRetake = el.instruction;
      });
    });
  }

  onApprove() {
    if (this.nextImageText === 'Done') {
      let status = 'pending';
      if (this.passportImages.some((el) => el.approved === false)) {
        status = 'retake_needed';
      } else {
        status = 'approved';
      }
      this.orderService
        .updateOrder(this.data._id || '', this.passportImages)
        .pipe(take(1))
        .subscribe(() => {
          this.orderService
            .changeOrderStatus(this.data._id || '', {
              orderStatus: status,
            })
            .pipe(take(1))
            .subscribe((res) => {
              window.location.reload();
            });
        });
    } else if (this.currentFormIsValid) {
      this.passportImages[this.currentIndex] = {
        ...this.passportImages[this.currentIndex],
        approved: this.currentApprovedFormControl?.value,
        instructionsForRetake: this.currentInstructionsFormControl?.value,
      };
      this.currentIndex++;
      this.currentImage = this.passportImages[this.currentIndex];
      if (this.currentIndex + 1 === this.passportImages.length)
        this.nextImageText = 'Done';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  get currentApprovedFormControl() {
    return this.imageStatuses.at(this.currentIndex).get('approved');
  }
  get currentInstructionsFormControl() {
    return this.imageStatuses.at(this.currentIndex).get('instruction');
  }

  get currentFormIsValid() {
    const approved = this.currentApprovedFormControl?.value;
    const instruction = this.currentInstructionsFormControl?.value;
    if (approved || instruction) return true;
    else return false;
  }
}
