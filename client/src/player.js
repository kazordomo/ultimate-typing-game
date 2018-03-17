import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function newPlayer(player, cb) {
    socket.emit('subscribe to room');
    // socket.on('new player', playerJoined => cb(null, playerJoined));
    socket.emit('new player', player);
}

function updatePlayerScores(data, cb) {
    socket.on('get score', data => cb(null, data));
    socket.emit('update score', data);
}

function getPlayerScores(data, cb) {
    socket.on('get score', data => cb(null, data));
    socket.emit('submit score', data);
}

function unsubscribe() {
    socket.emit('unsubscribe');
}


export { newPlayer, getPlayerScores, unsubscribe };