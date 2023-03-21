import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogApprovalComponent } from '../dialog-approval/dialog-approval.component';
import { Router } from '@angular/router';
import { PendingDashboardComponent } from '../pending-dashboard/pending-dashboard.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-decline-instruction',
  templateUrl: './dialog-decline-instruction.component.html',
  styleUrls: ['./dialog-decline-instruction.component.css'],
})
export class DialogDeclineInstructionComponent {
  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<DialogApprovalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: MatDialogRef<PendingDashboardComponent>
  ) {}

  onNoClick() {
    this.dialogRef.close();
    this.router.navigate(['pendingApproval']);
  }
  onSubmit() {
    this.data.close();
    this.router.navigate(['pendingApproval']);
  }
}
