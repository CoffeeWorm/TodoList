module.exports = {
  entry: {
    index: './js/index.js'
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  }
}