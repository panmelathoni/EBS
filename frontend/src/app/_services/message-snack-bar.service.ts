import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'


@Injectable({
  providedIn: 'root'
})
export class MessageSnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  showErrorMessage(msg: string){
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['red-snackbar']

    }
    )
  }

  showSuccessMessage(msg: string){
    this.snackBar.open(msg, 'X', {
      duration: 4000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: ['blue-snackbar']

    }
    )
  }
}