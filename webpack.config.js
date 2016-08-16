var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: "./src/index.tsx",
  output: {
    path: "dist",
    filename: "bundle.js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
  },

  plugins: [
    // Redux needs this to compile with its optimizations
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true
      },
      hash: true,
      filename: "index.html",
      template: 'src/index.ejs',
      inject: false,
      environment: (process.env.NODE_ENV || "development")
    }),
    new CopyWebpackPlugin([
        {from: "node_modules/react-mdl/extra/material.min.css"},
        {from: "style.css"},
        {from: "src/sw.js"},
        {from: "node_modules/react/dist/react.js"},
        {from: "node_modules/react/dist/react.min.js"},
        {from: "node_modules/react-dom/dist/react-dom.js"},
        {from: "node_modules/react-dom/dist/react-dom.min.js"},
        {from: "node_modules/react-mdl/extra/material.min.js"},
      ])
  ],

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ],

    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  // Redirects 404 to index.html, used with webpack-dev-server
  devServer: {
    historyApiFallback: true
  }
};
