import { Configuration } from 'webpack';

import { BuildOptions } from 'settings/webpack/types';

export function buildResolvers(options: BuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    alias: {
      '@': options.paths.src,
    },
  };
}
