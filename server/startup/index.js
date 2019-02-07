import './db_connector';
import { server } from '../app'

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

function startServer(serv) {
	return new Promise((resolve, reject) => {
		const httpServer = serv.listen(PORT);
	
		httpServer.once('error', (err: any) => {
			if (err.code === 'EADDRINUSE') {
				reject(err);
			}
		});
	
		httpServer.once('listening', () => resolve(httpServer));
	}).then(httpServer => {
		const { port } = httpServer.address();
		console.info(`==> 🌎 Listening on ${port}.`);
	});
}

console.log('Starting http server...');
startServer(server).catch(err => {
	console.error('Error in server', err);
})

if (isDev && module.hot) {
	let currentServer = server;
	module.hot.accept('../app', () => {
		currentServer.close();
	import('../app')
		.then(({ server: nextServer }) => {
			currentServer = nextServer;
			startServer(currentServer).catch(err => {
				console.error('Error in server', err);
			})
			console.log('HttpServer reloaded!');
		})
		.catch(err => console.error(err));
	});
	module.hot.accept(err => console.error(err));
}







