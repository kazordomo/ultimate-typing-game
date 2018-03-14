import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function newPlayer(playerId) {
    //TODO: send in username/user.id instead of socket.id.
    socket.emit('new player', playerId);
}

function updatePlayerScores(data, cb) {
    socket.on('update score', data => cb(null, data));
    socket.emit('update score', data);
}


export { newPlayer, updatePlayerScores };