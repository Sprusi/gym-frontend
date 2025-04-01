import webpack from 'webpack';

import { BuildOptions } from './types';

import { buildDevServer } from './devServer/buildDevServer';
import { buildLoaders } from './loaders/buildLoaders';
import { buildPlugins } from './plugins/buildPlugins';
import { buildResolvers } from './resolvers/buildResolvers';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === 'development';

  return {
    mode: mode ?? 'development',
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: 'index-bundle.js',
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    plugins: buildPlugins(options),
    module: { rules: buildLoaders(options) },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : 'source-map',
  };
}
