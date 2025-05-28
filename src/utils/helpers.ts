/**
 * Groups an array of objects by a specified key
 * @param array The array to group
 * @param key The key to group by
 */
export const groupBy = <T>(array: T[], key: keyof T): { [key: string]: T[] } => {
  return array.reduce(
    (result, item) => {
      const groupKey = String(item[key]);
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    },
    {} as { [key: string]: T[] },
  );
};

/**
 * Sorts an array of objects by a specified key
 * @param array The array to sort
 * @param key The key to sort by
 * @param order The sort order (default: 'asc')
 */
export const sortBy = <T>(array: T[], key: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  return [...array].sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Removes duplicate items from an array
 * @param array The array to deduplicate
 * @param key Optional key to deduplicate objects by
 */
export const uniqueBy = <T>(array: T[], key?: keyof T): T[] => {
  if (key) {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) return false;
      seen.add(value);
      return true;
    });
  }
  return Array.from(new Set(array));
};

/**
 * Deep clones an object or array
 * @param obj The object to clone
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  const cloned = {} as T;
  Object.keys(obj).forEach(key => {
    cloned[key as keyof T] = deepClone(obj[key as keyof T]);
  });

  return cloned;
};

/**
 * Picks specified properties from an object
 * @param obj The source object
 * @param keys The keys to pick
 */
export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key];
    }
  });
  return result;
};

/**
 * Omits specified properties from an object
 * @param obj The source object
 * @param keys The keys to omit
 */
export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach(key => {
    delete result[key];
  });
  return result;
};

/**
 * Flattens a nested object structure
 * @param obj The object to flatten
 * @param prefix The prefix for nested keys
 */
export const flattenObject = (
  obj: Record<string, any>,
  prefix: string = '',
): Record<string, any> => {
  return Object.keys(obj).reduce(
    (acc, key) => {
      const pre = prefix.length ? `${prefix}.` : '';

      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        Object.assign(acc, flattenObject(obj[key], pre + key));
      } else {
        acc[pre + key] = obj[key];
      }

      return acc;
    },
    {} as Record<string, any>,
  );
};

/**
 * Checks if two objects are deeply equal
 * @param obj1 First object
 * @param obj2 Second object
 */
export const isDeepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => keys2.includes(key) && isDeepEqual(obj1[key], obj2[key]));
};

/**
 * Creates a debounced version of a function
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, wait);
  };
};

/**
 * Creates a throttled version of a function
 * @param func The function to throttle
 * @param limit The time limit in milliseconds
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};
