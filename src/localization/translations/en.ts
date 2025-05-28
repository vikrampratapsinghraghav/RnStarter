export default {
  common: {
    loading: 'Loading...',
    error: {
      general: 'Something went wrong',
      tryAgain: 'Try again'
    },
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
      confirm: 'Confirm',
      delete: 'Delete',
      continue: 'Continue',
      retry: 'Retry',
    },
    search: {
      placeholder: 'Search...',
    },
  },
  auth: {
    initializing: 'Initializing app...',
    login: {
      title: 'Welcome Back',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      submit: 'Login',
      noAccount: "Don't have an account?",
      signup: 'Sign up',
      error: {
        invalidCredentials: 'Invalid email or password',
        general: 'Failed to login. Please try again.',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email address',
        passwordRequired: 'Password is required',
        passwordLength: 'Password must be at least 8 characters'
      }
    },
    signup: {
      title: 'Create Account',
      name: 'Name',
      namePlaceholder: 'Enter your name',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter your password',
      submit: 'Sign up',
      haveAccount: 'Already have an account?',
      login: 'Login',
      error: {
        general: 'Failed to create account. Please try again.',
        nameRequired: 'Name is required',
        nameLength: 'Name must be at least 2 characters',
        emailRequired: 'Email is required',
        emailInvalid: 'Invalid email address',
        passwordRequired: 'Password is required',
        passwordLength: 'Password must be at least 8 characters',
        passwordsDoNotMatch: "Passwords don't match"
      }
    },
    logout: {
      title: 'Logout',
      confirm: 'Are you sure you want to logout?',
      success: 'Successfully logged out',
      cancel: 'Cancel'
    }
  },
  navigation: {
    home: 'Home',
    profile: 'Profile',
    settings: 'Settings'
  },
  screens: {
    home: {
      title: 'Welcome Home',
      subtitle: 'This is your personalized home screen'
    },
    profile: {
      title: 'Your Profile',
      subtitle: 'Manage your personal information'
    },
    settings: {
      title: 'Settings',
      theme: 'Theme Settings',
      language: 'Language Settings'
    }
  },
  posts: {
    search: {
      placeholder: 'Search posts...',
    },
    empty: {
      title: 'No posts available',
    },
    actions: {
      favorite: 'Toggle favorite',
      delete: 'Delete post',
      sort: 'Sort posts',
    },
    errors: {
      fetch: 'Failed to fetch posts',
      delete: 'Failed to delete post',
      retry: 'Try Again',
    },
  },
  theme: {
    title: 'Theme Demo',
    light: '☀️ Light Mode',
    dark: '🌙 Dark Mode',
    system: 'System Theme',
    colors: {
      title: 'Colors',
      primary: 'Primary',
      secondary: 'Secondary',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
    },
    typography: {
      title: 'Typography',
      xxxl: 'XXXL Text ({{size}}px)',
      xxl: 'XXL Text ({{size}}px)',
      xl: 'XL Text ({{size}}px)',
      lg: 'Large Text ({{size}}px)',
      md: 'Medium Text ({{size}}px)',
      sm: 'Small Text ({{size}}px)',
      xs: 'XS Text ({{size}}px)',
    },
    surfaces: {
      title: 'Surfaces',
      paper: 'Paper Surface',
      elevated: 'Elevated Surface',
    },
  },
  settings: {
    title: 'Settings',
    language: {
      title: 'Language',
      english: 'English',
      arabic: 'العربية',
      restartTitle: 'Restart Required',
      restartMessage:
        'The app needs to restart to change the layout direction. Do you want to continue?',
    },
    theme: {
      title: 'Theme',
      description: 'Choose your preferred theme',
    },
  },
};
