import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function newPlayer(player, cb) {
    socket.emit('subscribe to room');
    socket.on('new player', players => {
        let structuredPlayers = {user: '', opponent: ''};
        Object.keys(players).forEach(key => {
            if(socket.id === key) {
                structuredPlayers.user = players[key].user;
            } else {
                structuredPlayers.opponent = players[key].user;
            }
        });
        cb(null, structuredPlayers);
    });
    socket.emit('new player', player);
}

function updateWpm(wpm, cb) {
    socket.on('get wpm', data => cb(null, data));
    socket.emit('update wpm', wpm);
}

function updateTime(start, cb) {
    socket.on('get time', time => cb(null, time));
    socket.emit('timer', start);
}

function unsubscribe() {
    socket.emit('unsubscribe');
}

export { newPlayer, updateTime, updateWpm, unsubscribe };