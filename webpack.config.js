const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 module.exports = {
   entry: './src/script.js',
   devServer: {
    static: './dist',
  },
   plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
   output: {
    filename: 'index.js',
     path: path.resolve(__dirname, 'dist'),
   },
   module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },

 };