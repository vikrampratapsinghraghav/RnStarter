import { useState, useEffect } from 'react';

/**
 * A hook that delays updating a value for the specified delay time.
 * Useful for search inputs or other scenarios where you want to wait
 * for the user to stop typing before performing an action.
 *
 * @param value The value to debounce
 * @param delay The delay time in milliseconds (default: 500ms)
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
