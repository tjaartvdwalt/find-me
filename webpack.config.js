const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {

  devtool: 'source-map',
  entry: './index.web.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js'
  },

  plugins: [new HtmlWebpackPlugin({
    title: 'Find Me',
    template: 'templates/index.ejs'
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
        }],
        exclude: /flexboxgrid/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
        include: /flexboxgrid/
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
    Config: JSON.stringify(process.env.ENV === 'production' ? {
      callbackUrl: 'https://tjaart.gitlab.io/findme',
      webtaskUrl: 'https://wt-c7accb88c76dd1674c80cfeaa6e015c3-0.run.webtask.io/findme',
      clientId: 'mKPHl3hi9ws7CmMkbCEgB0Ss19MVyD5Z',
      domain: 'tjaart.auth0.com'
    } : {
      callbackUrl: 'http://localhost:8080',
      // for now we use the live server for dev as well
      webtaskUrl: 'https://wt-c7accb88c76dd1674c80cfeaa6e015c3-0.run.webtask.io/findme',
      clientId: 'mKPHl3hi9ws7CmMkbCEgB0Ss19MVyD5Z',
      domain: 'tjaart.auth0.com'
    })
  }
}
