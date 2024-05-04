module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // ['@babel/plugin-proposal-decorators', { legacy: true }],
    // ['babel-plugin-transform-typescript-metadata', { legacy: true }],
    [
      'react-native-reanimated/plugin',
      {
        globals: ['__scanCodes'],
      },
    ],
  ],
};
