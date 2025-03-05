// dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) {}

  openDialog(component: ComponentType<any>, data?: any) {
    const dialogRef = this.dialog.open(component, {
      width: '400px',
      data: data // passing data to dialog
    });

    return dialogRef.afterClosed();
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
