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

### 5. API Integration
- Centralized API configuration
- Type-safe API calls
- Error handling
- Response handling
- Example endpoints for posts
- Integration with JSONPlaceholder API

### 6. Common Components
- Text component with theme and RTL support
- Error Boundary component
- Loading indicators
- Custom buttons
- List components

## 📦 Project Structure

```
src/
├── api/                  # API related code
│   ├── config.ts        # API configuration
│   ├── endpoints/       # API endpoints
│   └── types.ts         # API types
├── components/          # Reusable components
│   └── common/         # Common components
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

## 📝 Contributing

[Contribution guidelines...]

## 📄 License

[License information...]

## 🤝 Support

[Support information...]

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

---
This starter template is maintained by [Your Name/Organization].
