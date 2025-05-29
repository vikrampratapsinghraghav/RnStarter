import { API_BASE_URL as BASE_URL } from '@env';

/** Base URL for all API endpoints */
export const API_BASE_URL = BASE_URL;

/** Default headers to be included in all API requests */
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

/**
 * Custom error class for handling API-specific errors
 * @extends Error
 */
export class ApiError extends Error {
  /**
   * Creates an instance of ApiError
   * @param {number} status - HTTP status code
   * @param {string} message - Error message
   */
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Handles API responses and performs error checking
 * @template T - The expected response data type
 * @param {Response} response - The fetch Response object
 * @returns {Promise<T>} The parsed response data
 * @throws {ApiError} When the response is not ok or parsing fails
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new ApiError(response.status, response.statusText || 'Network response was not ok');
  }

  try {
    const data = await response.json();
    return data as T;
  } catch (error) {
    throw new ApiError(500, 'Failed to parse response');
  }
}
