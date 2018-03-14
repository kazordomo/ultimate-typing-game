const socketIO = require('socket.io');

module.exports = (server) => {
    const players = {};
    const io = socketIO(server);
    io.on('connection', socket => {
        socket.on('new player', state => {
            console.log('New player jouned whit state: ' + state);
            //TODO: the key will be the id of the user. if we are going to display the user name, we will need to add it to the state and use state._id as the key.
            players[state] = state;
            // io.emit('update players');
        });
        socket.on('update score', data => {
            
            io.emit('update score', data);
        });
        socket.on('disconnect', () => { 
            // delete player[socket.id]; 
            console.log('remove user'); 
            // io.emit('update players');
        });
    });
}