module.exports = {
  cache: true,

  entry: {
    'app': ['./static/js/app.js']
  },

  output: {
    filename: '[name].js'
  },

  resolve: {
    root: __dirname,
    alias: {
      'jquery': 'static/lib/jquery-2.1.3.min.js'
    }
  }
}