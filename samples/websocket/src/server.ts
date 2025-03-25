import express from 'express';

export function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Serve static files from the 'public' directory
  app.use(express.static('samples/websocket/public'));

  // Create HTTP server
  const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });

  return server;
}
