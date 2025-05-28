import {
  API_URL,
  API_TIMEOUT,
  ENABLE_ANALYTICS,
  ENABLE_PUSH_NOTIFICATIONS,
  APP_NAME,
  APP_VERSION,
  BUILD_NUMBER,
  AUTH_PERSISTENCE_KEY,
  JWT_STORAGE_KEY,
} from '@env';

export const config = {
  api: {
    baseURL: API_URL,
    timeout: parseInt(API_TIMEOUT, 10),
  },
  features: {
    analytics: ENABLE_ANALYTICS === 'true',
    pushNotifications: ENABLE_PUSH_NOTIFICATIONS === 'true',
  },
  app: {
    name: APP_NAME,
    version: APP_VERSION,
    buildNumber: parseInt(BUILD_NUMBER, 10),
  },
  auth: {
    persistenceKey: AUTH_PERSISTENCE_KEY,
    jwtStorageKey: JWT_STORAGE_KEY,
  },
} as const;

// Type for the entire config object
export type Config = typeof config;

// Helper function to validate required environment variables
const validateEnvVariables = () => {
  const requiredVars = [
    'API_URL',
    'API_TIMEOUT',
    'APP_NAME',
    'APP_VERSION',
    'BUILD_NUMBER',
    'AUTH_PERSISTENCE_KEY',
    'JWT_STORAGE_KEY',
  ];

  const missingVars = requiredVars.filter(varName => {
    const value = process.env[varName];
    return value === undefined || value === '';
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(', ')}`,
    );
  }
};

// Validate environment variables in development
if (__DEV__) {
  validateEnvVariables();
}

export default config; 