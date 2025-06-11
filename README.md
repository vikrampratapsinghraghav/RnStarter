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

### 8. Form Handling
- React Hook Form integration
- Zod schema validation
- Type-safe form handling
- Built-in form validation
- Custom form components

## 📋 Prerequisites

- Node.js >= 18
- React Native 0.79.2
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

## 📦 Project Structure

```
src/
├── api/                  # API related code
│   ├── config.ts        # API configuration
│   ├── endpoints/       # API endpoints
│   └── types.ts         # API types
├── components/          # Reusable components
│   └── common/         # Common components
├── config/             # App configuration
│   └── env/           # Environment configurations
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
git clone https://github.com/vikrampratapsinghraghav/RnStarter
```

2. Install dependencies
```bash
yarn install
```

3. Install iOS pods
```bash
cd ios && pod install
```

4. Choose environment (optional)
```bash
# Development environment
yarn env:dev

# Staging environment
yarn env:staging

# Production environment
yarn env:prod
```

5. Run the app
```bash
# iOS
yarn ios

# Android
yarn android
```

## 🔧 Dependencies

### Core Dependencies
- React Native v0.79.2
- React Navigation v7
- Redux Toolkit
- React Redux
- i18next & react-i18next
- React Native Localize
- AsyncStorage
- React Native Vector Icons
- React Hook Form
- Zod

### Development Dependencies
- TypeScript
- ESLint
- Prettier
- Jest
- React Native Dotenv
- Babel Plugin Module Resolver

## Available Scripts

```bash
# Start the app
yarn start

# Run on specific platform
yarn ios
yarn android

# Linting
yarn lint
yarn lint:fix

# Formatting
yarn format
yarn format:check

# Environment switching
yarn env:dev
yarn env:staging
yarn env:prod

# Testing
yarn test
```

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


Need customizations or features? [Open an issue](https://github.com/vikrampratapsinghraghav/RnStarter/issues) or contact me directly.

## 🔐 Environment Configuration

The project uses `.env` files for environment-specific configuration. Create the following files in your project root:

- `.env.development` - Development environment variables
- `.env.staging` - Staging environment variables
- `.env.production` - Production environment variables

Example `.env` file structure:
```env
API_URL=https://api.example.com
API_KEY=your_api_key
```

Note: Never commit your actual `.env` files to version control. Use `.env.example` as a template.

---
This starter template is maintained by [Vikram Pratap Singh Raghav](https://github.com/vikrampratapsinghraghav).

## 💅 Code Quality Tools

### ESLint

The project uses a comprehensive ESLint setup with the following configurations:

```javascript
{
  extends: [
    '@react-native',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react-native/all',
    'prettier',
  ]
}
```

Key Features:
- TypeScript-aware linting with `@typescript-eslint`
- React and React Native specific rules
- React Hooks rules enforcement
- Prettier integration
- Custom rules for better code quality:
  - No inline styles (warning)
  - No color literals (warning)
  - No console logs (except warn and error)
  - Unused variables detection
  - And more...

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

## 🎨 Vector Icons Setup

The project includes [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons) with full setup for both iOS and Android.

### Available Icon Families
- MaterialIcons
- FontAwesome
- Ionicons
- AntDesign
- And many more...

### Usage Example
```typescript
import Icon from 'react-native-vector-icons/MaterialIcons';

// In your component
<Icon name="home" size={24} color={theme.colors.primary} />
```

### iOS Setup
The necessary font files are already linked in the Xcode project. If you need to add more icon families:

1. Add this to your `ios/Podfile`:
```ruby
pod 'RNVectorIcons', :path => '../node_modules/react-native-vector-icons'
```

2. Add fonts to your `Info.plist`:
```xml
<key>UIAppFonts</key>
<array>
  <string>MaterialIcons.ttf</string>
  <string>FontAwesome.ttf</string>
  <!-- Add more font files as needed -->
</array>
```

### Android Setup
The necessary setup is already done in:
- `android/app/build.gradle` - Font assets configuration
- `android/app/src/main/assets/fonts/` - Font files location

To use custom icons, place your `.ttf` files in the fonts directory.

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
This starter template is maintained by [Vikram Pratap Singh Raghav](https://github.com/vikrampratapsinghraghav).
