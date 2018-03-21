const socketIO = require('socket.io');

module.exports = (server) => {

    const io = socketIO(server);

    const players = {};
    let roomno = 1;

    io.on('connection', socket => {
        let gameIsReady = false;
        let interval = null;

        socket.on('subscribe to room', room => {
            if(io.nsps['/'].adapter.rooms[`room-${roomno}`] && io.nsps['/'].adapter.rooms[`room-${roomno}`].length > 1) 
                roomno++;
            socket.join(`room-${roomno}`);
        });

        socket.on('unsubscribe', () => {
            socket.leave(`room-${roomno}`);
            // delete players[socket.id];
        });

        socket.on('new player', user => {
            players[socket.id] = { user: user.local.username, isReady: false };
            socket.broadcast.emit('new player', players[socket.id]);
            // io.sockets.in(`room-${roomno}`).emit('new player', players[socket.id]); //use this to dispaly players.
        });

        socket.on('player is ready', () => {
            let player = players[socket.id];
            if(!player) {
                return;
            }
            player.isReady = !player.isReady; 
            io.sockets.in(`room-${roomno}`).emit('player is ready', players);
        })

        socket.on('update score', data => {
            let counter = 60;
            interval = setInterval(() => {
                if(counter === 0) {
                    clearInterval(interval);
                    io.sockets.in(`room-${roomno}`).emit('final score', data); //?
                }
                console.log(data);
                data.counter = counter;
                data.player = players[socket.id];
                io.sockets.in(`room-${roomno}`).emit('get score', data);
                counter--;
            }, 1000);
        });

        socket.on('disconnect', () => { 
            clearInterval(interval);
            socket.leave(`room-${roomno}`);
            delete players[socket.id]; 
            // io.emit('update players');
        });

    });
}