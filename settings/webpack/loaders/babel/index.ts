import { BuildOptions } from 'settings/webpack/types';

const reactRefreshBabelPlugin = require.resolve('react-refresh/babel');

export const getBabelLoaders = ({ hot }: BuildOptions) => {
  return {
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: [hot && reactRefreshBabelPlugin].filter(Boolean),
        presets: ['@babel/preset-env'],
        sourceMap: true,
      },
    },
  };
};
