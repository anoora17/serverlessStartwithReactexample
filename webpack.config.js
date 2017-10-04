
const debug = process.env.NODE_ENV !== "production";
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
module.exports = {
		 entry: 'slsw.lib.entries',
		 target: "node",
		 // Since 'aws-sdk' is not compatible with webpack,
		 // we exclude all node dependencies
 externals: [nodeExternals()],
 // Run babel on all .js files and skip those in node_modules
 module: {
loader: [
  {
	 test: /\.js$/,
	 loader: "babel-loader",
	 include: __dirname,
	 exclude: /node_modules/
  }
    ]
  }
},
output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: './handler.js'
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  
  ],
};


//ref:https://github.com/serverless-heaven/serverless-webpack