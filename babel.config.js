module.exports = function (api) {
  api.cache(true);

  const isReleaseCI = process.env.BUILD_RELEASE === 'true';

  return {
    presets: ['module:@react-native/babel-preset'],
    plugins: [
      // ❌ عطّل reanimated plugin في Release CI فقط
      ...(isReleaseCI ? [] : ['react-native-reanimated/plugin']),

      [
        'module-resolver',
        {
          root: ['./src/'],
          extensions: [
            '.ios.ts',
            '.android.ts',
            '.ts',
            '.ios.tsx',
            '.android.tsx',
            '.tsx',
            '.jsx',
            '.js',
            '.json',
          ],
          alias: {
            '@src': './src',
            '@screens': './src/screens',
            '@theme': './src/themes',
            '@style': './src/styles',
            '@utils': './src/utils',
            '@assets': './src/assets',
            '@commonComponent': './src/commonComponent',
            '@components': './src/components',
            '@api': './src/api',
            '@App': './App',
          },
        },
      ],

      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          allowUndefined: true,
        },
      ],
    ],
  };
};
