import { Server } from 'http';
import WebSocket from 'ws';

export function connectSocket(server: Server) {
  // Create WebSocket server
  const wss = new WebSocket.Server({ server });

  // Store connected clients
  const clients = new Set<WebSocket>();

  wss.on('connection', (ws) => {
    console.log('New client connected');

    // Add client to pool
    clients.add(ws);

    // Send welcome message to the new client
    ws.send(
      JSON.stringify({
        type: 'system',
        message: 'Welcome to the WebSocket Chat!',
        timestamp: new Date().toISOString(),
      })
    );

    // Notify all clients about new connection
    broadcast(
      JSON.stringify({
        type: 'system',
        message: 'A new user has joined the chat',
        timestamp: new Date().toISOString(),
      }),
      ws
    );

    ws.on('message', (message) => {
      console.log(`Received: ${message}`);

      // Broadcast the message to all clients
      broadcast(
        JSON.stringify({
          type: 'user',
          message: message.toString(),
          timestamp: new Date().toISOString(),
        }),
        ws
      );
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      clients.delete(ws);

      // Notify all clients about disconnection
      broadcast(
        JSON.stringify({
          type: 'system',
          message: 'A user has left the chat',
          timestamp: new Date().toISOString(),
        }),
        ws
      );
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  function broadcast(message: string, sender: WebSocket) {
    clients.forEach((client: WebSocket) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }
}
