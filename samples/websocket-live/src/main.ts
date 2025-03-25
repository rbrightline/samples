import express from 'express';
import { Server as HttpServer } from 'http';
import { WebSocket, Server as WsServer } from 'ws';

function startServer() {
  const app = express();
  app.use(express.static('samples/websocket-live/public'));
  return app.listen(3000, () => {
    console.log('Live Stack View is up and running at http://[::1]:3000');
  });
}

function startWebsocket(server: HttpServer) {
  const clients = new Set<WebSocket>();
  const wss = new WsServer({ server });

  wss.on('connection', (newClientSocket) => {
    console.log('There a new client connection');
    clients.add(newClientSocket);

    setInterval(() => {
      newClientSocket.send(Math.ceil(Math.random() * 100));
    }, 1);
  });
}

startWebsocket(startServer());
