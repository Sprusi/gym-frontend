import { BuildOptions } from "settings/webpack/types";
import { Configuration } from "webpack";

export function buildResolvers(
  options: BuildOptions
): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
    alias: {
      "@": options.paths.src,
    },
  };
}
