const socketIO = require('socket.io');

module.exports = (server) => {

    const io = socketIO(server);

    const players = {};
    let roomno = 1;

    // io.on('connection', socket => {
    //     let interval = null;

    //     socket.on('subscribe to room', room => {
    //         if(io.nsps['/'].adapter.rooms[`room-${roomno}`] && io.nsps['/'].adapter.rooms[`room-${roomno}`].length > 1) 
    //             roomno++;
    //         socket.join(`room-${roomno}`);
    //     });

    //     socket.on('unsubscribe', () => {
    //         socket.leave(`room-${roomno}`);
    //         delete players[socket.id];
    //     });

    //     socket.on('new player', user => {
    //         players[socket.id] = { user: user.user.local.username, isReady: false };
    //         io.sockets.in(`room-${roomno}`).emit('new player', players);
    //     });

    //     socket.on('player is ready', () => {
    //         let player = players[socket.id];
    //         if(!player) {
    //             return;
    //         }
    //         player.isReady = !player.isReady; 
    //         io.sockets.in(`room-${roomno}`).emit('player is ready', players);
    //     })

    //     socket.on('timer', start => {
    //         let counter = 10;
    //         if(start) {
    //             interval = setInterval(() => {
    //                 counter--;
    //                 socket.emit('get time', counter);
    //                 if(counter === 0) {
    //                     clearInterval(interval);
    //                 }
    //             }, 1000);
    //         } else {
    //             socket.emit('get time', counter);
    //         }
    //     });

    //     socket.on('update wpm', wpm => {
    //         socket.broadcast.emit('get wpm', wpm);            
    //     });

    //     socket.on('disconnect', () => { 
    //         clearInterval(interval);
    //         socket.leave(`room-${roomno}`);
    //         delete players[socket.id]; 
    //         // io.emit('update players');
    //     });

    // });
}