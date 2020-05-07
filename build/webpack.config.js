const Webpack = require('webpack');

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const vueLoaderPlugin = require('vue-loader/lib/plugin');

// const indexLess = new ExtractTextWebpackPlugin('index.less');
// const indexCss = new ExtractTextWebpackPlugin('index.css');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
    // header: path.resolve(__dirname, '../src/header.js')
  },
  output: {
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../public/header.html'),
    //   filename: 'header.html',
    //   chunks: ['header']
    // }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].css',
    }),
    // indexLess,
    // indexCss,
    new vueLoaderPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', 'css-loader'] // 从右向左解析
      // },
      // {
      //   test: /\.less$/,
      //   use: [
      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'less-loader'
      //   ]
      // }
      {
        test: /\.css$/,
        use: indexCss.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        use: indexLess.extract({
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|acc)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'media/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf|)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'fonts/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ],
  },
  resolve: {
      alias: {
        'vue$': 'vue/dist/vue.runtime.esm.js',
        ' @': path.resolve(__dirname, '../src')
      },
      extensions: ['*', '.js', '.json', '.vue']
  },
  devServer: {
    port: 3000,
    hot: true,
    contentBase: '../dist'
  }
}