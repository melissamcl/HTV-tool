const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'client/src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: '[name][contenthash].js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'client/dist'),
    },
    port: 8080,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true, // for client-side routing
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        secure: false,
      },
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(js|ts)x$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'HTV Tool',
      filename: 'index.html',
      template: path.resolve(__dirname, 'client/public/index.html'),
    }),
  ],
};
