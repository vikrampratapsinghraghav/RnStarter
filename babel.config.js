module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: true,
        allowUndefined: false,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@theme': './src/theme',
          '@localization': './src/localization',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@store': './src/store',
          '@config': './src/config',
          '@assets': './src/assets',
          '@types': './src/types'
        },
      },
    ],
    //keep this plugin at the end of the array
    'react-native-reanimated/plugin',
  ],
};
