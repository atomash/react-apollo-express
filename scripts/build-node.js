process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const config = require('../config/webpack.config.node');
const compiler = webpack(config);
const chalk = require('chalk');

console.log(
	`${chalk.magenta(
		'[INFO]'
	)} Before running SSR production build you have to run ${chalk.underline(
		'npm run build'
	)} to create an optimized production build of your ${chalk.underline(
		'create-react-app'
	)} application.`
);

console.log(chalk.cyan('\nCreating production Server build...\n'));


compiler.run((err, stats) => {
	if (err) {
		console.error(err.stack || err);
		if (err.details) {
			console.error(err.details);
		}
		return;
	}

	const info = stats.toJson();

	if (stats.hasErrors()) {
		console.error(info.errors);
	}

	if (stats.hasWarnings()) {
		console.warn(info.warnings);
	}
	const statsString = stats.toString({
		colors: true,
	});
	console.log(statsString);

	if (stats.hasErrors()) {
		console.error(chalk.red('\nBuild failed!'));
	} else {
		console.log(chalk.green('\nBuild successful!'));
	}
});