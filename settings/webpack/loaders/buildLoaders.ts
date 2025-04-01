import { ModuleOptions } from 'webpack';

import { BuildOptions } from 'settings/webpack/types';

import { assetLoader } from './asset';
import { getBabelLoaders } from './babel';
import { getStyleLoaders } from './style';
import { svgLoader } from './svg';
import { tsLoader } from './ts';

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
  return [getBabelLoaders(options), assetLoader, svgLoader, getStyleLoaders(options), tsLoader];
}
