module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    //keep this plugin at the end of the array
    'react-native-reanimated/plugin',
  ],
};
