const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV;

const config = {
	mode: NODE_ENV,
	target: 'node',
	entry: ['./server/startup/index.js'],
	output: {
		path: path.join(__dirname, '../build/server'),
		// Build it as a commonjs library so we can include it
		filename: 'index.js',
		// Build it as a commonjs library so we can include it
		libraryTarget: 'commonjs',
	},
	externals: [],
	module: {
		rules: [
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: '[name].[hash:8].[ext]',
					publicPath: '/static/media/',
					outputPath: '../client/static/media/',
				},
			},
			{
				test: /\.js$/,
				exclude: [/[/\\\\]node_modules[/\\\\]/],
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							babelrc: false,
							compact: false,
							presets: [
								'babel-preset-react-app',
								'@babel/preset-env',
							],
							plugins: [
								'@babel/plugin-syntax-dynamic-import',
								'dynamic-import-node',
								'babel-plugin-transform-class-properties',
							],
							cacheDirectory: true,
							highlightCode: true,
						},
					},
				],
			},
			{ test: /\.(.css|scss)$/, loader: 'ignore-loader' },
		],
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],
};

if (NODE_ENV === 'production') {
	config.externals.unshift(nodeExternals())
	config.plugins.push(
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
	)
} else {
	config.entry.unshift('webpack/hot/poll?1000'); 
	config.externals.unshift(nodeExternals({
		// Include the hot reload polling code in the bundle though
		whitelist: ['webpack/hot/poll?1000'],
	}))
	config.plugins.unshift(
		new webpack.HotModuleReplacementPlugin(),
	)
	
}


module.exports = config