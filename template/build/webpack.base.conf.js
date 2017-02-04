var path = require('path')
var config = require('../config')
var utils = require('./utils')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var projectRoot = path.resolve(__dirname, '../')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var appEnv = process.env.ENV || 'dev'

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.ts', '.json'],
    fallback: [path.join(__dirname, '../node_modules')],
    modulesDirectories: [
      path.join(__dirname, '../node_modules'),
      path.join(__dirname, '../src'),
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'env': path.resolve(__dirname, '../src/config', appEnv)
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {

    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.html$/,
        loader: "html"
      },
      {
        test: /\.scss$/,
        include: [
          path.join(__dirname, '../src'),
        ],
        loader: ExtractTextPlugin.extract([
          'css',
          'postcss',
          'sass?config=sassConfig'
        ])
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract([
          'css'
        ])
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style/[name].css', {
        allChunks: true
    })
  ],
  ts: {
    experimentalDecorators: true,
    logLevel: 'error',
    silent: true,
    transpileOnly: true
  },
  postcss: function () {
    return [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      }),
      require('postcss-assets')({
        relative: true,
        loadPaths: [path.join(__dirname, '../src/assets')]
      })
    ]
  },
  sassConfig: {
    includePaths: [
      path.join(__dirname, '../src/sass'),
      require('bourbon').includePaths,
      path.join(__dirname, '../node_modules')
    ],
    outputStyle: 'compressed'
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
}
