import { Server } from 'socket.io';
import { httpServer } from '../../server.mjs';
import eventWebSocket from '../events/eventWebSocket.mjs';

let io;

const ioconnection = () => {
  io = new Server(httpServer);

  io.on('connection', socket => {
    socket.on('message', message => {
      console.log(message);
    });
    eventWebSocket.on('bdd-new-realty', (realty) => ioNewRealty(socket, realty) );
  });
};

const ioNewRealty = (socket, realty) => {
  console.log('hello serveur');
  socket.emit('new-realty', realty);
};

export { ioconnection, ioNewRealty };
