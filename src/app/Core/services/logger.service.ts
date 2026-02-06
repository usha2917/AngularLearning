/**
 * Logging Service
 * Centralized logging for the application with environment-aware configuration
 */

import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private readonly logLevels: Record<LogLevel, number> = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  private readonly currentLevel = this.logLevels[environment.logging.level as LogLevel];

  debug(message: string, data?: any): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: any): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: any): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: any): void {
    this.log('error', message, error);
    if (environment.logging.enableRemote && environment.production) {
      this.logToRemote(message, error);
    }
  }

  private log(level: LogLevel, message: string, data?: any): void {
    const levelValue = this.logLevels[level];
    
    if (levelValue >= this.currentLevel && environment.logging.enableConsole) {
      const timestamp = new Date().toISOString();
      const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
      
      switch (level) {
        case 'debug':
          console.debug(prefix, message, data);
          break;
        case 'info':
          console.info(prefix, message, data);
          break;
        case 'warn':
          console.warn(prefix, message, data);
          break;
        case 'error':
          console.error(prefix, message, data);
          break;
      }
    }
  }

  private logToRemote(message: string, error: any): void {
    // Implement remote logging (e.g., Sentry, LogRocket)
    // This is a placeholder for production error tracking
    console.warn('Remote logging not configured:', message, error);
  }
}
