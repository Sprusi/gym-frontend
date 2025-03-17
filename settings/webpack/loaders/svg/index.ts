export const svgLoader = {
  test: /\.svg$/,
  issuer: /\.[jt]sx?$/,
  use: [
    {
      loader: "@svgr/webpack",
      options: {
        icon: true,
        svgoConfig: {
          plugins: [{ name: "convertColors", params: { currentColor: true } }],
        },
      },
    },
  ],
};
