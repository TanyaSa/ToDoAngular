import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export enum MessageType {
  error = 'error',
  warning = 'warning',
  info = 'info'
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private _snackBar: MatSnackBar, private zone: NgZone) { }
  showWarning(message: string): void {
    this.showMessage(message, MessageType.warning);
  }
  showInfo(message: string): void {
    this.showMessage(message, MessageType.info);
  }
  showError(message: string): void {
    this.showMessage(message, MessageType.error);
  }

  private showMessage(message: string, messageType: MessageType): void {
    this.zone.run(() => {
      this._snackBar.open(message, null, {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: `${messageType}-message`
      });
    });
  }
}
