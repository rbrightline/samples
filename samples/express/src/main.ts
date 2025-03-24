import express from 'express';

const data = {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  roles: ['admin', 'user'],
};

function main() {
  express()
    .get('/', (_, res) => {
      res.send(data);
    })
    .listen(3000, () => {
      console.log('Express server is running at http://localhost:3000');
    });
}

main();
