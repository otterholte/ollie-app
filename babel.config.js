module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@': './src',
            '@components': './src/components',
            '@features': './src/features',
            '@hooks': './src/hooks',
            '@stores': './src/stores',
            '@utils': './src/utils',
            '@constants': './src/constants',
            '@types': './src/types',
          },
        },
      ],
    ],
  };
};


