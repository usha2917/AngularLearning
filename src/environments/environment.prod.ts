/**
 * Environment Configuration - Production
 * This file contains production-specific settings
 */

export const environment = {
  production: true,
  apiBaseUrl: 'https://api.yourcompany.com',
  apiTimeout: 30000,
  logging: {
    enableConsole: false,
    enableRemote: true,
    level: 'error'
  },
  features: {
    enableErrorTracking: true,
    enableAnalytics: true
  }
};
