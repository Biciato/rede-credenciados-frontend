import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface NewActivityData {
  name: string;
}

@Component({
  selector: 'new-activity-dialog',
  templateUrl: 'new-activity.dialog.html'
})
export class NewActivityDialog {

  constructor(
    public dialogRef: MatDialogRef<NewActivityData>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
