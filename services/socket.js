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
    let counter = 60;
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
            console.log('new user: ' + user.local.username);
            let playersInRoom = Object.keys(io.sockets.sockets);
            players[socket.id] = user.local.username;
            if(playersInRoom.length === 2) {
                io.sockets.in(`room-${roomno}`).emit('new player', true);                
            } else {
                io.sockets.in(`room-${roomno}`).emit('new player', false);
            }
            // io.sockets.in(`room-${roomno}`).emit('new player', players[socket.id]); //use this to dispaly players.
            // io.emit('update players');
        });

        socket.on('update score', data => {
            //TODO: use a stream/buffer to send back the data? a bit laggy atm.
            let playersInRoom = Object.keys(io.sockets.sockets);
            let interval = setInterval(() => {
                data.counter = counter;
                console.log(data);
                io.sockets.in(`room-${roomno}`).emit('get score', data);
                counter--;
            }, 1000);
        });

        socket.on('disconnect', () => { 
            console.log('removed user: ' + players[socket.id]);
            socket.leave(`room-${roomno}`);
            delete players[socket.id]; 
            // io.emit('update players');
        });

    });
}