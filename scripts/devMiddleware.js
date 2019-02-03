const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config');
const config = configFactory('development');

const compiler = webpack(config);

module.exports = app => {
	console.log('Development: Applying webpackDevMiddleware');

	app.use(
		webpackDevMiddleware(compiler, {
			hot: true,
			stats: {
				colors: true,
			},
			historyApiFallback: true,
			serverSideRender: true,
		})
	);

	console.log('Development: Applying webpackHotMiddleware');
	app.use(
		webpackHotMiddleware(compiler, {
			log: console.log,
			path: '/__webpack_hmr',
			heartbeat: 10 * 1000,
		})
	);
};
