import path from 'path';
import precss from 'precss';
import autoprefixer from 'autoprefixer';

// import webpack from 'webpack';

export default () => ({
  entry: {
    app: './client/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: '[name].bundle.js',
  },
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
      test: /\.(scss)$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        {
          loader: 'postcss-loader',
          options: { plugins: () => [precss, autoprefixer] },
        },
        { loader: 'sass-loader' },
      ],
    }],
  },
});
