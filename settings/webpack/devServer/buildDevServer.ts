import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

import { BuildOptions } from '../types';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  const { port } = options;
  return {
    port: port,
    open: true,
    historyApiFallback: true,
    hot: false,
  };
}
