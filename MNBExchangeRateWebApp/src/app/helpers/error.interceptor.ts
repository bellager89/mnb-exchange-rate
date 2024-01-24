import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';
        if(error.error?.errors){
          console.log(error.error.errors)
          errorMessage = `Error: ${this.formatKeyValuePairs(error.error.errors)}`;
        }
        else if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        this.snackBar.open(errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-toast'],
        });

        return throwError(errorMessage);
      })
    );
  }

  private formatKeyValuePairs(errorObject: any): string {
    let formattedMessage = '';

    for (const key in errorObject) {
      if (errorObject.hasOwnProperty(key)) {
        const value = errorObject[key];
        formattedMessage += `${key}: ${Array.isArray(value) ? value[0] : value}\n`;
      }
    }

    return formattedMessage.trim();
  }
}