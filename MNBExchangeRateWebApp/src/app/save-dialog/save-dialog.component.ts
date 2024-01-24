import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-dialog',
  templateUrl: './save-dialog.component.html',
  styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent {

  comment: string = '';

  constructor(
    public dialogRef: MatDialogRef<SaveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.comment = data.comment ?? '';
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Perform the save operation here using this.comment
    this.data.saveCallback(this.comment);
    this.dialogRef.close();
  }
}