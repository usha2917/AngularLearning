/**
 * API Configuration Token
 * Provides environment-specific API configuration
 */

import { InjectionToken } from '@angular/core';
import { environment } from '../../../environments/environment';

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
}

export const API_CONFIG = new InjectionToken<ApiConfig>('api.config');

export const createApiConfig = (): ApiConfig => ({
  baseUrl: environment.apiBaseUrl,
  timeout: environment.apiTimeout
});
