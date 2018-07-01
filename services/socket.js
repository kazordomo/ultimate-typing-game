const socketIO = require('socket.io');

module.exports = server => {

    const io = socketIO(server);
    const players = {};
    // const rooms = [];
    let roomno = 1;

    io.on('connection', socket => {
        let interval = null;

        //TODO: with room number (roomno) we will basically que up players and give them
        //the next possible room. this will need to be changed when implementing some kind of
        //skill/rank/level matchup-search.

        socket.on('subscribe to room', () => {
            let playersInRoom = io.nsps['/'].adapter.rooms[`room-${roomno}`];
            //TODO: delete the room if roomno === 0
            if(playersInRoom && playersInRoom.length > 1) {
                roomno++;
            }
            socket.join(`room-${roomno}`);
        });

        //TODO: problem seems to lie here. we start the game according to the callback inside
        //the new player emit function.
        socket.on('new player', user => {
            players[socket.id] = { user: user.data.local.username };
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

        socket.on('disconnet', () => {
            socket.emit('player disconnet', players[socket.id]);
        });

        //TODO: when a player leaves durring a game, the opponent should not notice
        //and finish the game as usual. the room should stay the same so that no other joins the
        //room. the player leaving should have a loss.
        socket.on('unsubscribe', () => {
            interval && clearInterval(interval);
            // delete players[socket.id];
            io.of('/').in('room name').clients(function(error, clients) {
                if (clients.length > 0) {
                    clients.forEach(function (socket) {
                        io.sockets.sockets[socket.id].leave(`room-${roomno}`);
                    });
                }
            });
            // socket.leave(`room-${roomno}`);
        });
    });
}