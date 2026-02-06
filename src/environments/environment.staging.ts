/**
 * Environment Configuration - Staging
 * This file contains staging-specific settings
 */

export const environment = {
  production: false,
  apiBaseUrl: 'https://staging-api.yourcompany.com',
  apiTimeout: 30000,
  logging: {
    enableConsole: true,
    enableRemote: true,
    level: 'info'
  },
  features: {
    enableErrorTracking: true,
    enableAnalytics: true
  }
};
