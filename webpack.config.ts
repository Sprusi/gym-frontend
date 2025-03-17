import webpack from "webpack";
import path from "path";
import { buildWebpack } from "./settings/webpack/buildWebpack";
import { BuildMode } from "settings/webpack/types";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  hot: string;
  analyzer: string;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? "development",
    port: env.port ?? 3000,
    paths: {
      entry: path.resolve(__dirname, "src", "index"),
      output: path.resolve(__dirname, "build"),
      html: path.resolve(__dirname, "public", "index.html"),
      favicon: path.resolve(__dirname, "public", "favicon.ico"),
      src: path.resolve(__dirname, "src"),
      public: path.resolve(__dirname, "public"),
    },
    hot: env.hot === "true" ? true : false,
    analyzer: env.analyzer === "true" ? true : false,
  });
  return config;
};
