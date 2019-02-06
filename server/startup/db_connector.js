const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		auto_reconnect: true,
		reconnectTries: Number.MAX_VALUE,
		reconnectInterval: 3000,
	}
);
// mongoose.set('useCreateIndex', true);
mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connection.on('connected', () => {
	console.log('Connected to database');
});
mongoose.connection.on('error', err => {
	console.log(`Connection error: ${err}`);
	mongoose.disconnect();
});
mongoose.connection.on('reconnected', () => {
	console.log('database reconnected!');
});
mongoose.connection.on('disconnected', () => {
	console.log('database disconnected');
	setTimeout(() => {
		mongoose.connect(
			process.env.DB_CONNECT,
			{
				useNewUrlParser: true,
				auto_reconnect: true,
				reconnectTries: Number.MAX_VALUE,
				reconnectInterval: 1000,
			}
		);
	}, 3000);
});

