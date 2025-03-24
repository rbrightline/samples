import fastify from 'fastify';

const data = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  roles: ['admin', 'user'],
};

const server = fastify({ logger: false });

server.get('/', () => {
  return data;
});

const start = async () => {
  try {
    await server.listen({ port: 3001 });
    console.log(`Fastify server is running at http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
