import path from 'path';
import webpack from 'webpack';

import { BuildMode } from 'settings/webpack/types';

import { buildWebpack } from './settings/webpack/buildWebpack';

interface EnvVariables {
  mode: BuildMode;
  port: number;
  analyzer: string;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3001,
    paths: {
      entry: path.resolve(__dirname, 'src', 'index'),
      output: path.resolve(__dirname, 'build'),
      html: path.resolve(__dirname, 'public', 'index.html'),
      favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
      src: path.resolve(__dirname, 'src'),
      public: path.resolve(__dirname, 'public'),
    },
    analyzer: env.analyzer === 'true' ? true : false,
  });
  return config;
};
