import './db_connector';
import { server, app } from '../app'

const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== 'production';

function startServer() {
	return new Promise((resolve, reject) => {
		const httpServer = server.listen(PORT);
	
		httpServer.once('error', (err: any) => {
			if (err.code === 'EADDRINUSE') {
				reject(err);
			}
		});
	
		httpServer.once('listening', () => resolve(httpServer));
	}).then(httpServer => {
		const { port } = httpServer.address();
		console.info(`==> 🌎 Listening on ${port}.`);
	
		if (isDev && module.hot) {
			let currentApp = app;
			module.hot.accept('../app', () => {
				httpServer.removeListener('request', currentApp);
			import('../app')
				.then(({ app: nextApp }) => {
					currentApp = nextApp;
					httpServer.on('request', currentApp);
					console.log('HttpServer reloaded!');
				})
				.catch(err => console.error(err));
			});
			module.hot.accept(err => console.error(err));
			module.hot.dispose(() => {
				console.log('Disposing entry module...');
				httpServer.close();
			});
		}
	});
}
	
console.log('Starting http server...');
startServer().catch(err => {
	console.error('Error in servev', err);
})








