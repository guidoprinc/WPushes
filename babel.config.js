module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'import-glob',
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@app': './src/app',
          '@authScreens': './src/app/screens/Auth/screens',
          '@components': './src/app/components',
          '@config': './src/config',
          '@constants': './src/constants',
          '@hooks': './src/app/hooks',
          '@interfaces': './src/interfaces',
          '@navigationHelper': './src/app/components/AppNavigator/helper',
          '@redux': './src/redux',
          '@screens': './src/app/screens',
          '@services': './src/services',
          '@utils': './src/utils'
        }
      }
    ]
  ]
};
