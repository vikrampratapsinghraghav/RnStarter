import { useState, useCallback, useEffect } from 'react';
import { AppError, handleApiError, logError } from '../utils/errorHandler';

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheItem<any>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface UseApiOptions {
  cacheKey?: string;
  cacheDuration?: number;
  enabled?: boolean;
}

export function useApi<T>(
  apiFunction: () => Promise<T>,
  options: UseApiOptions = {},
): ApiState<T> & {
  refetch: () => Promise<void>;
  clearCache: () => void;
} {
  const { cacheKey, cacheDuration = CACHE_DURATION, enabled = true } = options;

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const clearCache = useCallback(() => {
    if (cacheKey) {
      cache.delete(cacheKey);
    }
  }, [cacheKey]);

  const fetchData = useCallback(async () => {
    // Check cache first
    if (cacheKey) {
      const cachedItem = cache.get(cacheKey);
      if (cachedItem && Date.now() - cachedItem.timestamp < cacheDuration) {
        setState({
          data: cachedItem.data,
          loading: false,
          error: null,
        });
        return;
      }
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const result = await apiFunction();

      // Update cache
      if (cacheKey) {
        cache.set(cacheKey, {
          data: result,
          timestamp: Date.now(),
        });
      }

      setState({
        data: result,
        loading: false,
        error: null,
      });
    } catch (error) {
      const errorDetails = handleApiError(error);
      logError(error instanceof AppError ? error : new Error(errorDetails.message));

      setState({
        data: null,
        loading: false,
        error: errorDetails.message,
      });
    }
  }, [apiFunction, cacheKey, cacheDuration]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled, fetchData]);

  return {
    ...state,
    refetch: fetchData,
    clearCache,
  };
}
