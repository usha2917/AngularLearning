/**
 * HTTP Error Interceptor
 * Handles HTTP errors globally across the application
 */

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: HttpErrorResponse): void {
    let message = 'An error occurred';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      message = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      message = `Status ${error.status}: ${error.statusText}`;
    }

    this.logger.error(message, {
      url: error.url,
      status: error.status,
      statusText: error.statusText,
      message: error.message
    });
  }
}
