
import { IncomingMessage } from 'http';
import { WebSocketServer } from 'ws';

const http = require('http');
const url = require('url');
const uuidv4 = require('uuid').v4;

const server = http.createServer();
const wsServer = new WebSocketServer({ server });
const port = 8080;

interface ConnectionInfo {
  uuid: string | undefined;
  username: string | undefined;
  connection: WebSocket | undefined;
}
interface Session {
  host: ConnectionInfo;
  guest: ConnectionInfo;
  score: any;
}
interface Sessions {
  [sessionId: string]: Session;
}

const sessions: Sessions = {};

const handleMessage = (message: any, sessionId: string) => {
  console.log(message.toString());
  broadcast(sessionId);
};

const handleClose = (uuid: string, sessionId: string) => {
  // console.log(`${users[uuid].username} disconnected`);
  if (sessions[sessionId]) {
    if (sessions[sessionId].host.uuid === uuid) {
      // Host disconnected
      delete sessions[sessionId];
    } else if (sessions[sessionId].guest.uuid === uuid) {
      sessions[sessionId].guest = {
        uuid: undefined,
        username: undefined,
        connection: undefined,
      }
    }
  }
  broadcast(sessionId);
};

const broadcast = (sessionId: string) => {
  if (sessions[sessionId]) {
    const hostConnection = sessions[sessionId].host.connection;
    const guestConnection = sessions[sessionId].guest.connection;
    if (hostConnection) {
      hostConnection.send(sessions[sessionId].score);
    }
    if (guestConnection) {
      guestConnection.send(sessions[sessionId].score);
    }
  }
};

wsServer.on('connection', (connection: WebSocket, request: IncomingMessage) => {
  // const {
  //   host,
  //   sessionId,
  //   username,
  // }: {host: boolean, sessionId: string, username: string} = url.parse(request.url, true).query;
  // console.log(`${username} connected`);
  // const uuid: string = uuidv4();
  // if (host) {
  //   // This is a new session, instantiate it accordingly
  //   sessions[sessionId] = {
  //     host: {
  //       uuid,
  //       username,
  //       connection,
  //     },
  //     guest: {
  //       uuid: undefined,
  //       username: undefined,
  //       connection: undefined,
  //     },
  //     score: {
  //       /**
  //        * @todo Fill in with PlayerScore state
  //        */
  //     },
  //   };
  // } else {
  //   // This is a guest, have them join an existing session
  //   sessions[sessionId].guest = {
  //     uuid,
  //     username,
  //     connection,
  //   };
  // }
  const sessionId = 'test';
  // @ts-ignore
  connection.on('message', (message) => handleMessage(message, sessionId));
  // // @ts-ignore
  // connection.on('close', () => handleClose(uuid, sessionId));
})

server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
