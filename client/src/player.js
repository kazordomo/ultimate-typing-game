import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function newPlayer(player, cb) {
    socket.emit('subscribe to room');
    socket.on('new player', playerJoined => cb(null, playerJoined));
    socket.emit('new player', player);
}

function playerIsReady(cb) {
    socket.on('player is ready', player => cb(null, player));
    socket.emit('player is ready');
}

function updatePlayerScores(data, cb) {
    socket.on('get score', data => cb(null, data));
    socket.emit('update score', data);    
    // setInterval(() => {
    //     socket.emit('update score', data);
    // }, 1000);
}

function unsubscribe() {
    socket.emit('unsubscribe');
}


export { newPlayer, playerIsReady, updatePlayerScores, unsubscribe };