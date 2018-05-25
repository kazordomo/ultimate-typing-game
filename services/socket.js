const socketIO = require('socket.io');

module.exports = (server) => {

    const io = socketIO(server);
    const players = {};
    let roomno = 1;

    //TODO: a new player/socket is added on page reload, even if same player as before.
    //the roomno does not increase in this case.

    io.on('connection', socket => {
        let interval = null;

        socket.on('subscribe to room', room => {
            let playersInRoom = io.nsps['/'].adapter.rooms[`room-${roomno}`];
            if(playersInRoom && playersInRoom.length > 1) {
                roomno++;
            }
            socket.join(`room-${roomno}`);
            console.log(roomno);
        });

        //TODO: when a player leaves durring a game, the opponent should not notice
        //and finish the game as usual. the room should stay the same so that no other joins the
        //room. the player leaving should have a loss.
        socket.on('unsubscribe', () => {
            interval && clearInterval(interval);
            delete players[socket.id];
            socket.leave(`room-${roomno}`);
        });

        //TODO: problem seems to lie here. we start the game according to the callback inside
        //the new player emit function.
        socket.on('new player', user => {
            players[socket.id] = { user: user.data.local.username };
            console.log(players);
            io.sockets.in(`room-${roomno}`).emit('new player', players);
        });

        socket.on('timer', start => {
            let counter = 10;
            if(start) {
                interval = setInterval(() => {
                    counter--;
                    socket.emit('get time', counter);
                    if(counter === 0) {
                        clearInterval(interval);
                    }
                }, 1000);
            } else {
                socket.emit('get time', counter);
            }
        });

        socket.on('update wpm', wpm => {
            socket.broadcast.emit('get wpm', wpm);  
        });

        //disconnect is build in within socket object.
        socket.on('disconnet', () => {
            socket.emit('player disconnet', players[socket.id]);
        });
    });
}