import * as http from 'http';

const data =
  '{"id":1,"name":"John Doe","email":"john.doe@example.com","roles":["admin","user"]}';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(data);
});

server.listen(port, hostname, () => {
  console.log(`Node server running at http://localhost:${port}/`);
});
