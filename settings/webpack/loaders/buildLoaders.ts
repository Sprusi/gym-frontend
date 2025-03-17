import { ModuleOptions } from "webpack";
import { assetLoader } from "./asset";
import { svgLoader } from "./svg";
import { tsLoader } from "./ts";
import { getStyleLoaders } from "./style";
import { BuildOptions } from "settings/webpack/types";
import { getBabelLoaders } from "./babel";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  return [
    getBabelLoaders(options),
    assetLoader,
    svgLoader,
    getStyleLoaders(options),
    tsLoader,
  ];
}
