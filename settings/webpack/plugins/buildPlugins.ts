import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack, { Configuration, container } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

import { BuildOptions } from 'settings/webpack/types';

import { dependencies } from '../../../package.json';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const { ModuleFederationPlugin } = container;

export function buildPlugins(options: BuildOptions): Configuration['plugins'] {
  const { mode, paths, analyzer } = options;
  const isProd = mode === 'production';

  const env = dotenv.config().parsed || {};
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {} as Record<string, string>);

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({
      favicon: paths.favicon,
      template: paths.html,
    }),
    new webpack.DefinePlugin(envKeys),
    new ModuleFederationPlugin({
      name: 'GymFrontend',
      filename: `remoteEntry.js`,
      exposes: {
        './GymFrontend': './src/navigation/index.tsx',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: dependencies['react-dom'],
        },
        'react-router-dom': {
          singleton: true,
          requiredVersion: dependencies['react-router-dom'],
        },
      },
    }),
  ];

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[id].[contenthash].css',
        ignoreOrder: true,
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}

// name: 'GymFrontend',
// filename: `remoteEntry.js`,
//                              -> в хосте  NameForHost:'GymFrontend@http://localhost:3001/remoteEntry.js',
//                                                       ↑↑↑↑↑↑↑↑↑↑↑                       ↑↑↑↑↑↑↑↑↑↑↑↑↑↑

// exposes: {
//   './SportProject': './src/navigation/NavigationChild.tsx',
// },
//                               -> './SportProject' в хосте при импорте компоненты  import NavigationChild from 'GymFrontend/SportProject';
//                                                                                                                            ↑↑↑↑↑↑↑↑↑↑↑
//                               -> NavigationChild - название произвольное, главное чтобы не Navigation
