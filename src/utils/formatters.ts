/**
 * Formats a number as currency
 * @param value The number to format
 * @param currency The currency code (default: 'USD')
 * @param locale The locale to use (default: 'en-US')
 */
export const formatCurrency = (
  value: number,
  currency: string = 'USD',
  locale: string = 'en-US',
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value);
};

/**
 * Formats a date string or timestamp
 * @param date The date to format
 * @param format The format to use ('relative' | 'short' | 'long')
 * @param locale The locale to use (default: 'en-US')
 */
export const formatDate = (
  date: Date | string | number,
  format: 'relative' | 'short' | 'long' = 'short',
  locale: string = 'en-US',
): string => {
  const dateObj = new Date(date);

  if (format === 'relative') {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    const now = new Date();
    const diff = dateObj.getTime() - now.getTime();
    const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

    if (Math.abs(diffDays) < 1) {
      const diffHours = Math.round(diff / (1000 * 60 * 60));
      if (Math.abs(diffHours) < 1) {
        const diffMinutes = Math.round(diff / (1000 * 60));
        return rtf.format(diffMinutes, 'minute');
      }
      return rtf.format(diffHours, 'hour');
    }
    return rtf.format(diffDays, 'day');
  }

  const options: Intl.DateTimeFormatOptions =
    format === 'long'
      ? {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      : {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        };

  return new Intl.DateTimeFormat(locale, options).format(dateObj);
};

/**
 * Truncates a string to a specified length
 * @param text The text to truncate
 * @param length The maximum length
 * @param suffix The suffix to add (default: '...')
 */
export const truncateText = (text: string, length: number, suffix: string = '...'): string => {
  if (text.length <= length) return text;
  return text.substring(0, length - suffix.length) + suffix;
};

/**
 * Formats a file size in bytes to a human-readable string
 * @param bytes The size in bytes
 * @param decimals The number of decimal places (default: 2)
 */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
};

/**
 * Formats a phone number to a standard format
 * @param phone The phone number to format
 * @param format The format to use (default: 'international')
 */
export const formatPhoneNumber = (
  phone: string,
  format: 'international' | 'national' = 'international',
): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');

  if (format === 'international') {
    if (cleaned.length === 10) {
      return `+1 (${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    if (cleaned.length === 11) {
      return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    }
  } else {
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
  }

  return phone; // Return original if format not possible
};
