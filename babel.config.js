module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-classname-to-style',
    [
      'react-native-platform-specific-extensions',
      {
        extensions: ['scss', 'sass'],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@components': './app/components',
          '@screens': './app/screens',
          '@utils': './app/utils',
        },
      },
    ],
  ],
};
