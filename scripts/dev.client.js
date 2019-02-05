const express = require('express');
const fs = require('fs-extra');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const configFactory = require('../config/webpack.config');

const config = configFactory('development');
const app = express();
const paths = require('../config/paths');


const compiler = webpack(config);

fs.emptyDirSync(paths.appBuild);

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

app.listen(3001, console.log(`Dev app on port 3001!`));


