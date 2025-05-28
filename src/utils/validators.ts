/**
 * Validates an email address
 * @param email The email address to validate
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates a password against common requirements
 * @param password The password to validate
 * @param options Custom validation options
 */
export const isValidPassword = (
  password: string,
  options: {
    minLength?: number;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
  } = {},
): { isValid: boolean; errors: string[] } => {
  const {
    minLength = 8,
    requireNumbers = true,
    requireSpecialChars = true,
    requireUppercase = true,
    requireLowercase = true,
  } = options;

  const errors: string[] = [];

  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }

  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (requireSpecialChars && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Validates a phone number
 * @param phone The phone number to validate
 * @param countryCode The country code to validate against (default: 'US')
 */
export const isValidPhoneNumber = (phone: string, countryCode: string = 'US'): boolean => {
  const phoneRegexMap: { [key: string]: RegExp } = {
    US: /^\+?1?\s*\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/,
    UK: /^\+?44\s?7\d{3}?\s?\d{3}?\s?\d{3}$/,
    // Add more country-specific regex patterns as needed
  };

  const regex = phoneRegexMap[countryCode];
  if (!regex) return false;

  return regex.test(phone);
};

/**
 * Validates a URL
 * @param url The URL to validate
 * @param requireHttps Whether to require HTTPS (default: false)
 */
export const isValidUrl = (url: string, requireHttps: boolean = false): boolean => {
  try {
    const urlObj = new URL(url);
    if (requireHttps && urlObj.protocol !== 'https:') {
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Validates a credit card number using the Luhn algorithm
 * @param cardNumber The credit card number to validate
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (!/^\d+$/.test(cleaned)) return false;

  let sum = 0;
  let isEven = false;

  // Loop through values starting from the rightmost digit
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Validates if a date is within a specified range
 * @param date The date to validate
 * @param minDate The minimum allowed date
 * @param maxDate The maximum allowed date
 */
export const isDateInRange = (date: Date, minDate?: Date, maxDate?: Date): boolean => {
  const timestamp = date.getTime();

  if (minDate && timestamp < minDate.getTime()) {
    return false;
  }

  if (maxDate && timestamp > maxDate.getTime()) {
    return false;
  }

  return true;
};
