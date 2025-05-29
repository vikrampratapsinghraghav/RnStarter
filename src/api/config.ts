import { API_BASE_URL as BASE_URL } from '@env';

export const API_BASE_URL = BASE_URL;

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

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
