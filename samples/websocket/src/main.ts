import { startServer } from './server';
import { connectSocket } from './socket';

const server = startServer();

connectSocket(server);
