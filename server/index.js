const http = require('http');
const server = require('./app');

const port = Number(process.env.PORT || '5000');
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});