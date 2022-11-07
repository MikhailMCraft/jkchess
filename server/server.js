const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const app = express();
const port = process.env.PORT || 3001;
const server = http.createServer(app);

app.use(cors());

let games = [{name: '132'}];

app.get('/game/exists', (req, res) => {
    let exists = false;
    for (let i = 0; i < games.length; i++) {
        if (games[i].name == req.query.name) {
            exists = true;
            break;
        }
    }
    res.json({ exists });
});

const io = new Server(server, { 
    cors: {
        origin: '*'
    }
});

io.on('connection', socket => {
    socket.on('join', name => {
        socket.join(name);
        // io.emit('message', msg);
    });
    socket.on('move', (board) => {
        socket.to().broadcast.emit(board);
    })
});

server.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});