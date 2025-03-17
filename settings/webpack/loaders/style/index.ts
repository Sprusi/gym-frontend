import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "settings/webpack/types";

export const getStyleLoaders = ({ mode }: BuildOptions) => {
  const isProd = mode === "production";
  const isDev = mode === "development";

  const moduleStyleLoader = {
    test: /\.module\.(sc|c)ss$/,
    use: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const baseStyleLoader = {
    use: [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
      "sass-loader",
    ],
  };

  const styleLoader = {
    test: /\.(sc|c)ss$/,
    oneOf: [moduleStyleLoader, baseStyleLoader],
  };

  return styleLoader;
};
