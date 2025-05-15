export const getBabelLoaders = () => {
  return {
    test: /\.(js|jsx)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        sourceMap: true,
      },
    },
  };
};
