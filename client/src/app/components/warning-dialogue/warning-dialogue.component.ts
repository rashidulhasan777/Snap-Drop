import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialogue',
  templateUrl: './warning-dialogue.component.html',
  styleUrls: ['./warning-dialogue.component.css'],
})
export class WarningDialogueComponent {
  constructor(public dialogRef: MatDialogRef<WarningDialogueComponent>) {}
}
