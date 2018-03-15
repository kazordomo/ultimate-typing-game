import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function newPlayer(player, cb) {
    socket.emit('subscribe to room');
    socket.on('new player', playerJoined => cb(null, playerJoined));
    socket.emit('new player', player);
}

function updatePlayerScores(data, cb) {
    socket.on('update score', data => cb(null, data));
    socket.emit('update score', data);
}


export { newPlayer, updatePlayerScores };