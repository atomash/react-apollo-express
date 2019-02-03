import http from "http";
import './db_connector';
import {gg} from '../app'
import app from '../app'
 
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

export default async (f) => {
	 await gg()
	const server = http.createServer(app);
let currentApp = app;
	server.listen(PORT, console.log(`App listening on port ${PORT}!`));

	server.on('error', error => {
		if (error.syscall !== 'listen') {
			throw error;
		}

		const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;

		switch (error.code) {
			case 'EACCES':
				console.error(`${bind} requires elevated privileges`);
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(`${bind} is already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	});

	if (isDev && module.hot) {
		module.hot.accept(['../app.js'], () => {
			server.removeListener("request", currentApp);
			server.on("request", app);
			currentApp = app;
		});
	}
}



