/**
 * Application Configuration
 * Central configuration for Angular providers, routing, HTTP client, and interceptors
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { ErrorInterceptor } from './Core/interceptors/error.interceptor';
import { LoggingInterceptor } from './Core/interceptors/logging.interceptor';
import { API_CONFIG, createApiConfig } from './Core/config/api.config';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zone change detection with event coalescing for performance
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // Router configuration with lazy-loaded routes
    provideRouter(routes),
    
    // HTTP client with custom interceptors
    provideHttpClient(
      withInterceptors([])
    ),
    
    // HTTP Interceptors for error handling and logging
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    },
    
    // API Configuration Token
    {
      provide: API_CONFIG,
      useFactory: createApiConfig
    }
  ]
};
