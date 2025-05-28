# RnStarter - React Native Starter Template

A feature-rich React Native starter template with TypeScript support, built-in navigation, theming, localization, and state management.

## 🚀 Features

### 1. Navigation
- Combined drawer and bottom tab navigation
- Type-safe navigation using TypeScript
- Screens:
  - Home
  - Profile
  - Settings
  - Language Settings
  - Theme Settings

### 2. Theming System
- Dynamic theme switching (Light/Dark)
- Custom theme configuration
- Theme context for easy access
- Consistent styling across the app
- Theme-aware components

### 3. Localization
- Multi-language support (English, Arabic)
- RTL support
- Language switching with automatic app restart
- Persistent language preferences
- Translation context

### 4. State Management
- Redux Toolkit integration
- Type-safe Redux hooks
- Centralized store configuration
- Example slice with posts management
- Async thunks for API calls
- Custom hooks for state management:
  - `useApi`: Type-safe API hook with caching and error handling
  - `useDebounce`: Debounce hook for optimizing input handling

### 5. API Integration
- Centralized API configuration
- Type-safe API calls
- Error handling with custom AppError class
- Response handling
- Example endpoints for posts
- Integration with JSONPlaceholder API
- Built-in caching system for API responses

### 6. Common Components
- Text component with theme and RTL support
- Error Boundary component
- Loading indicators
- Custom buttons
- List components
- SearchPosts component with debounced search

### 7. Utility Functions
- Formatters:
  - Currency formatting
  - Date formatting
  - Text truncation
  - File size formatting
  - Phone number formatting
- Validators:
  - Email validation
  - Password validation
  - Phone number validation
  - URL validation
  - Credit card validation
  - Date range validation
- Helpers:
  - Array operations (groupBy, sortBy, uniqueBy)
  - Object operations (deepClone, pick, omit, flattenObject)
  - Function utilities (debounce, throttle)
  - Deep equality checking
- Error Handling:
  - Custom AppError class
  - Structured error handling
  - API error handling
  - Safe function execution wrapper
  - Error logging with device info

## 📦 Project Structure

```
src/
├── api/                  # API related code
│   ├── config.ts        # API configuration
│   ├── endpoints/       # API endpoints
│   └── types.ts         # API types
├── components/          # Reusable components
│   └── common/         # Common components
├── hooks/              # Custom hooks
│   ├── useApi.ts      # API handling hook
│   └── useDebounce.ts # Debounce hook
├── utils/              # Utility functions
│   ├── formatters.ts  # Formatting utilities
│   ├── validators.ts  # Validation utilities
│   ├── helpers.ts     # Helper functions
│   └── errorHandler.ts # Error handling utilities
├── navigation/          # Navigation setup
│   ├── types.ts        # Navigation types
│   └── navigators/     # Navigation configurations
├── store/              # Redux store setup
│   ├── slices/         # Redux slices
│   └── hooks.ts        # Redux hooks
├── theme/              # Theme configuration
│   └── ThemeContext.tsx
└── localization/       # Localization setup
    └── translations/   # Translation files
```

## 🛠 Setup and Installation

1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
yarn install
```

3. Install iOS pods
```bash
cd ios && pod install
```

4. Run the app
```bash
# iOS
yarn ios

# Android
yarn android
```

## 🔧 Dependencies

- React Navigation
- Redux Toolkit
- React Redux
- i18next
- React Native Localize
- AsyncStorage
- React Native Vector Icons
- ESLint + Prettier for code quality
- [Other dependencies...]

## 🎨 Theme Customization

The app comes with a built-in theme system. You can customize colors, typography, and other design tokens in `src/theme/ThemeContext.tsx`.

```typescript
interface Theme {
  primary: {
    main: string;
    // ...
  };
  text: {
    primary: string;
    secondary: string;
    // ...
  };
  // ...
}
```

## 🌐 Adding New Languages

1. Create a new translation file in `src/localization/translations/`
2. Add the language option in `src/localization/LanguageContext.tsx`
3. Update the available languages list

## 📱 Adding New Screens

1. Create the screen component in `src/screens/`
2. Add the screen to the appropriate navigator
3. Update the navigation types in `src/navigation/types.ts`

## 🔄 State Management

The app uses Redux Toolkit for state management. To add a new feature:

1. Create a new slice in `src/store/slices/`
2. Add the reducer to the store configuration
3. Use the provided hooks (`useAppDispatch`, `useAppSelector`)

## 🌐 API Integration

The app includes a centralized API setup:

1. Configuration in `src/api/config.ts`
2. Type definitions in `src/api/types.ts`
3. Endpoints organized in `src/api/endpoints/`
4. Integration with Redux using async thunks

## 🔁 Contributing

Contributions are welcome! If you'd like to improve this template, feel free to:

- ⭐ Star the repository to support the project
- 🐛 Open an issue for bugs or suggestions
- 📥 Submit a pull request with enhancements or fixes

### Before contributing, please make sure to:

1. Follow the existing code style (Prettier + ESLint)
2. Write clear commit messages
3. Test your changes on both Android and iOS

Thank you for helping make this starter better!

## 📄 License

This project is licensed under the MIT License — you're free to use, modify, and distribute it with attribution.

See the [LICENSE](LICENSE) file for more details.

## 🤝 Support

If this project saved you hours of setup time, consider supporting me:

- ☕ [Buy Me a Coffee](https://buymeacoffee.com/vikrampratap)
- 💬 [Message me on LinkedIn](https://www.linkedin.com/in/vikramps98)
- 📦 [Download the advanced version on Gumroad](https://gumroad.com/vikramps98)

Need customizations or features? [Open an issue](https://github.com/vikrampratapsinghraghav/RnStarter/issues) or contact me directly.

---
Made with ❤️ by [Vikram Pratap Singh Raghav](https://github.com/vikrampratapsinghraghav)

## 💅 Code Quality Tools

### ESLint

The project uses ESLint for code linting with the following configurations:
- TypeScript support
- React and React Native specific rules
- Hooks rules
- Prettier integration

Available commands:
```bash
# Run linter
yarn lint

# Fix auto-fixable issues
yarn lint:fix
```

### Prettier

Prettier is configured for consistent code formatting with the following rules:
- Single quotes
- 2 spaces indentation
- 100 characters line length
- Trailing commas
- No semicolons

Available commands:
```bash
# Format all files
yarn format

# Check if files are formatted
yarn format:check
```

## 🪝 Custom Hooks

The project includes several custom hooks to handle common patterns:

### useApi
A powerful hook for making API calls with built-in features:
```typescript
const { data, loading, error, refetch, clearCache } = useApi(
  () => fetchData(),
  {
    cacheKey: 'unique-key',
    cacheDuration: 300000,
    enabled: true
  }
);
```

### useDebounce
A utility hook for debouncing values:
```typescript
const debouncedValue = useDebounce(value, 500);
```

## 🛠 Utility Functions

### Formatters
```typescript
import { formatCurrency, formatDate, truncateText } from './utils/formatters';

const price = formatCurrency(100, 'USD');
const date = formatDate(new Date(), 'MM/DD/YYYY');
const text = truncateText('Long text...', 50);
```

### Validators
```typescript
import { isValidEmail, isValidPassword } from './utils/validators';

const isValid = isValidEmail('user@example.com');
const isStrongPassword = isValidPassword('password123');
```

### Helpers
```typescript
import { groupBy, deepClone } from './utils/helpers';

const grouped = groupBy(items, 'category');
const cloned = deepClone(complexObject);
```

### Error Handling
```typescript
import { handleApiError, logError } from './utils/errorHandler';

try {
  // API call
} catch (error) {
  const errorDetails = handleApiError(error);
  logError(error);
}
```

---
This starter template is maintained by [Your Name/Organization].
