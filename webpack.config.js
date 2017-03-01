const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

  context: path.join(__dirname, '/client/src'),
  devtool: 'source-map',
  entry: './index.js',
  output: {
    path: path.join(__dirname, '/client/dist'),
    filename: 'bundle.js'

  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Email my location'
  })],
  module: {
    rules: [
      {
        test: /\.jsx?$/, // both .js and .jsx
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['latest'],
              plugins: [
                'transform-class-properties',
                'transform-object-rest-spread',
                'transform-runtime',
                'transform-react-jsx',
                'transform-react-jsx-source'
              ]
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              // emitError: true,
              // emitWarning: true
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader', // creates style nodes from JS strings
          options: {sourceMap: true}
        }, {
          loader: 'css-loader', // translates CSS into CommonJS
          options: {sourceMap: true}
        }, {
          loader: 'sass-loader', // compiles Sass to CSS
          options: {sourceMap: true}
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },

  externals: {
    'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? {
      callbackUrl: 'https://tjaart.gitlab.io/find-me'
    } : {
      callbackUrl: 'http://localhost:8080'
    })
  }
}
