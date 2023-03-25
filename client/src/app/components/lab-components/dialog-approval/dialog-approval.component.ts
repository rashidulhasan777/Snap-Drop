import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogDeclineInstructionComponent } from '../dialog-decline-instruction/dialog-decline-instruction.component';
import { PendingDashboardComponent } from '../pending-dashboard/pending-dashboard.component';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/orders/order.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-approval',
  templateUrl: './dialog-approval.component.html',
  styleUrls: ['./dialog-approval.component.css'],
})
export class DialogApprovalComponent {
  animal: string = '';
  name: string = '';
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<PendingDashboardComponent>,
    private orderService : OrderService,
    @Inject(MAT_DIALOG_DATA) public data: MatDialogRef<PendingDashboardComponent>
  ) {}

  onApprove() {
    this.router.navigate(['pendingApproval']);
  }

  onNoClick(): void {
    const dialogRef = this.dialog.open(DialogDeclineInstructionComponent, {
      data: this.dialogRef,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}
