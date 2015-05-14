module.exports = {
  cache: true,

  entry: {
    'index': ['index/app.jsx']
  },

  output: {
    filename: '[name].bundle.js'
  },

  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: "jsx-loader?harmony"}
    ]
  },
  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extensions: ["", ".js", ".jsx"],
    root: __dirname + '/public/js/src',
    modulesDirectories: ["node_modules"]
  }
}