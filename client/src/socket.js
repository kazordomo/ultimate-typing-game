// //refactor later
import openSocket from 'socket.io-client';
//TODO: make the path relative
const socket = openSocket('http://localhost:8000');

function subscribeToVersus(cb) {
    socket.on('versus', timestamp => cb(null, timestamp));
    socket.emit('subscribeToVersus', 1000);
}

export { subscribeToVersus };