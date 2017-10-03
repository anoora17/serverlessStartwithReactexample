const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
module.exports = {
		 entry: '..handler.js',
		 target: "node",
		 // Since 'aws-sdk' is not compatible with webpack,
		 // we exclude all node dependencies
 externals: [nodeExternals()],
 // Run babel on all .js files and skip those in node_modules
 module: {
 rules: [
  {
	 test: /\.js$/,
	 loader: "babel-loader",
	 include: __dirname,
	 exclude: /node_modules/
  }
    ]
  }
}


//ref:https://github.com/serverless-heaven/serverless-webpack