const { Server } = require('socket.io');

const io = new Server(8000, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});


io.on('connection', (socket) => {
    console.log('User connected', socket.id);
    socket.on('code-change', (data) => {
        socket.broadcast.emit('code-change', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });

});



