const path = require('path');
const BUILD_DIR = path.resolve(__dirname, './public/js');
const APP_DIR = path.resolve(__dirname, './src');

module.exports = {
  entry: {
    main: APP_DIR + '/index.jsx'
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react']
          }
        }
      }
      ,
      {
        test: /\.scss$/,
        use: [
            "style-loader",
            "css-loader",
            "sass-loader"
        ],
        exclude: /node_modules/
    }
    ]
  }
}
