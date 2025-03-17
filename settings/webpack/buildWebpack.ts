import webpack from "webpack";
import { BuildOptions } from "./types";
import { buildPlugins } from "./plugins/buildPlugins";
import { buildLoaders } from "./loaders/buildLoaders";
import { buildResolvers } from "./resolvers/buildResolvers";
import { buildDevServer } from "./devServer/buildDevServer";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";

  return {
    mode: mode ?? "development",
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: "index-bundle.js",
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    plugins: buildPlugins(options),
    module: { rules: buildLoaders(options) },
    resolve: buildResolvers(options),
    devtool: isDev ? "inline-source-map" : "source-map",
  };
}
