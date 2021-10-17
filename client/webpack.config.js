const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'production',
  entry: {
    main: './app.tsx',
  },
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: './index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css'
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: './assets', to: path.resolve(__dirname, 'dist/assets') }
        ]
      }
    )
  ],
  devServer: {
    compress: true,
    historyApiFallback: true,
    open: true,
    port: 4201,
    proxy: { 
      "/api" : 'http://localhost:5000'
    },
    client: {
      overlay: true
    }
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.scss$/, 
        use: [
          { loader: "style-loader" },
          { loader: "css-modules-typescript-loader",
            options: {
              //namedexport: true,
              camelcase: true,
              modules: true
            } 
          }, 
          { loader: "css-loader", options: { modules: true } }, 
          { loader: "sass-loader" },
          // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use:  "file-loader"
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: "file-loader"
      }
    ]
  }
}
