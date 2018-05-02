import autoprefixer from 'autoprefixer';
import path from 'path';
import precss from 'precss';
import webpack from 'webpack';

// export default (env, argv) => ({
export default () => ({
  entry: {
    app: ['./app/client/index.js'],
  },
  output: {
    path: path.resolve(__dirname, 'app', 'public', 'assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets/',
  },
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: { importLoaders: 1 },
        }, {
          loader: 'postcss-loader',
          options: { plugins: () => [precss, autoprefixer] },
        }],
    }, {
      test: /\.scss$/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: { minimize: process.env.NODE_ENV === 'production' },
        },
        {
          loader: 'postcss-loader',
          options: { plugins: () => [precss, autoprefixer] },
        },
        { loader: 'sass-loader' },
      ],
    }],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],
});
