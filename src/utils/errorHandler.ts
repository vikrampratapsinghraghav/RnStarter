import { Platform } from 'react-native';

export interface ErrorDetails {
  code?: string;
  message: string;
  timestamp: string;
  deviceInfo: {
    platform: string;
    version: string;
    model?: string;
  };
  context?: Record<string, any>;
  stack?: string;
}

/**
 * Custom error class for application-specific errors
 */
export class AppError extends Error {
  code?: string;
  context?: Record<string, any>;

  constructor(message: string, code?: string, context?: Record<string, any>) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
  }
}

/**
 * Gets device information in a type-safe way
 */
const getDeviceInfo = () => {
  const info = {
    platform: Platform.OS,
    version: Platform.Version.toString(),
  };

  // Add model information if available
  if (Platform.OS === 'ios') {
    const constants = Platform.constants as { systemName?: string };
    if (constants.systemName) {
      return { ...info, model: constants.systemName };
    }
  } else if (Platform.OS === 'android') {
    const constants = Platform.constants as { Model?: string };
    if (constants.Model) {
      return { ...info, model: constants.Model };
    }
  }

  return info;
};

/**
 * Creates a structured error object with additional context
 * @param error The error object
 * @param context Additional context information
 */
export const createErrorDetails = (
  error: Error | AppError,
  context?: Record<string, any>,
): ErrorDetails => {
  return {
    code: (error as AppError).code,
    message: error.message,
    timestamp: new Date().toISOString(),
    deviceInfo: getDeviceInfo(),
    context: {
      ...(error as AppError).context,
      ...context,
    },
    stack: error.stack,
  };
};

/**
 * Handles API errors and transforms them into user-friendly messages
 * @param error The error object
 */
export const handleApiError = (error: any): { message: string; code?: string } => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      code: error.code,
    };
  }

  if (error.response) {
    // Handle axios-like error responses
    const status = error.response.status;
    switch (status) {
      case 400:
        return {
          message: 'Invalid request. Please check your input.',
          code: 'BAD_REQUEST',
        };
      case 401:
        return {
          message: 'Authentication required. Please log in.',
          code: 'UNAUTHORIZED',
        };
      case 403:
        return {
          message: 'You do not have permission to perform this action.',
          code: 'FORBIDDEN',
        };
      case 404:
        return {
          message: 'The requested resource was not found.',
          code: 'NOT_FOUND',
        };
      case 429:
        return {
          message: 'Too many requests. Please try again later.',
          code: 'RATE_LIMIT',
        };
      case 500:
        return {
          message: 'An internal server error occurred. Please try again later.',
          code: 'SERVER_ERROR',
        };
      default:
        return {
          message: 'An unexpected error occurred. Please try again.',
          code: 'UNKNOWN',
        };
    }
  }

  if (error.request) {
    // Handle network errors
    return {
      message: 'Network error. Please check your connection.',
      code: 'NETWORK_ERROR',
    };
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    code: 'UNKNOWN',
  };
};

/**
 * Safely executes a function and handles any errors
 * @param fn The function to execute
 * @param errorHandler Optional custom error handler
 */
export const tryCatch = async <T>(
  fn: () => Promise<T>,
  errorHandler?: (error: any) => Promise<T>,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (errorHandler) {
      return errorHandler(error);
    }
    throw error;
  }
};

/**
 * Logs error details to the console and optionally to a logging service
 * @param error The error object
 * @param context Additional context information
 */
export const logError = (error: Error | AppError, context?: Record<string, any>): void => {
  const errorDetails = createErrorDetails(error, context);

  // Log to console in development
  if (__DEV__) {
    console.error('Error:', errorDetails);
  }

  // TODO: Add integration with error logging service (e.g., Sentry)
  // sendToErrorLoggingService(errorDetails);
};
