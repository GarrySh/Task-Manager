import autoprefixer from 'autoprefixer';
import path from 'path';
import precss from 'precss';
import webpack from 'webpack';

export default () => ({
  entry: {
    app: ['./client/index.js'],
    vendor: ['babel-polyfill', 'jquery', 'jquery-ujs', 'popper.js', 'bootstrap'],
  },
  output: {
    path: path.resolve(__dirname, 'app', 'public', 'assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets/',
  },
  mode: process.env.NODE_ENV || 'development',
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
    }),
    new webpack.optimize.SplitChunksPlugin({
      name: 'vendors',
      // filename: 'vendor.js',
      minChunks: Infinity,
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 100000, // Minimum number of characters
    }),
  ],
});
