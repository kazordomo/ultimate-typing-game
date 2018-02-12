const io = require('socket.io')();

//connect to client
io.on('connection', client => {
    //client subscription. func closure for every client
    client.on('subscribeToVersus', multiplayerGame => {
        //use a timer interval (multiplayerGame will act as it for now) to test in client
        console.log(`client is subscribing to timer with interval ${multiplayerGame}`);
        setInterval(() =>{
            client.emit('versus', new Date());
        }, multiplayerGame);
    })
})

const port = 8000;
io.listen(port);