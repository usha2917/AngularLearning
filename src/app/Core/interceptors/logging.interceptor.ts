/**
 * HTTP Logging Interceptor
 * Logs all HTTP requests for debugging and monitoring
 */

import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const started = Date.now();

    this.logger.debug(`HTTP Request: ${request.method} ${request.url}`);

    return next.handle(request).pipe(
      tap((event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          const elapsed = Date.now() - started;
          this.logger.debug(
            `HTTP Response: ${request.method} ${request.url}`,
            { status: event.status, elapsed: `${elapsed}ms` }
          );
        }
      })
    );
  }
}
