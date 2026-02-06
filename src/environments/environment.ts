/**
 * Environment Configuration - Development
 * This file contains development-specific settings
 */

export const environment = {
  production: false,
  apiBaseUrl: 'https://jsonplaceholder.typicode.com',
  apiTimeout: 30000,
  logging: {
    enableConsole: true,
    enableRemote: false,
    level: 'debug'
  },
  features: {
    enableErrorTracking: false,
    enableAnalytics: false
  }
};
