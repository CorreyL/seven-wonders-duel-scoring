
const { WebSocketServer } = require('ws');
const http = require('http');

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8080;

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
