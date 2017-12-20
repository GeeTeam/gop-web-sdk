var path = require('path');
var webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './demo/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'demo/dist')
    },
	devServer: {
		hot: true,
		publicPath: '/demo/dist',
		compress: true,
		port: 9000
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(['demo/dist/'])
    ]
};