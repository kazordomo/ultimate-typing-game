const socketIO = require('socket.io');

module.exports = (server) => {

    //TODO: if we need to save resources -
    //use namespaces for each rooms?
    //we do not need to send back and forth the users data, only the opponents.
    //we can track the users data from within the component state.
    //https://socket.io/docs/rooms-and-namespaces/

    const players = {};
    let roomno = 1;
    let gameIsReady = false;
    const io = socketIO(server);
    io.on('connection', socket => {

        socket.on('subscribe to room', room => {
            if(io.nsps['/'].adapter.rooms[`room-${roomno}`] && io.nsps['/'].adapter.rooms[`room-${roomno}`].length > 1) 
                roomno++;
            console.log('joining room: ' + 'room-' + roomno);
            socket.join(`room-${roomno}`);
        });

        socket.on('unsubscribe', () => {
            console.log('leaving room: ' + roomno);
            socket.leave(`room-${roomno}`);
            delete players[socket.id]; //?
        });

        socket.on('new player', user => {
            //TODO: the key will be the id of the user. if we are going to display the user name, we will need to add it to the state and use state._id as the key.
            console.log('new user: ' + user.local.username);
            players[socket.id] = user.local.username;
            io.sockets.in(`room-${roomno}`).emit('new player', players[socket.id]);
            // io.emit('update players');
        });

        socket.on('update score', data => {
            //TODO: use a stream/buffer to send back the data? a bit laggy atm.
            let playersInRoom = Object.keys(io.sockets.sockets);
            if(playersInRoom.length === 2) {
                gameIsReady = true;
            } else {
                gameIsReady = false;
            }
            data.gameIsReady = gameIsReady;
            io.sockets.in(`room-${roomno}`).emit('get score', data);
        });

        socket.on('disconnect', () => { 
            console.log('removed user: ' + players[socket.id]);
            socket.leave(`room-${roomno}`);
            delete players[socket.id]; 
            // io.emit('update players');
        });

    });
}