var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);

server.use(express.static('client'));

var nextID = 0;

var connectedUsers = {};

function broadcast_usersList() {
    io.emit('users-list', connectedUsers);
}

io.on('connection', function (socket) {
    var userID = ++nextID;
    var lastPingTime = new Date().getTime();

    console.log('user connected. ID:', userID);

    var userData = {
        id: userID,
        name: 'Player #' + userID,
        frags: 0,
        ping: 0,
        state: {
            control: {
                left: false,
                right: false,
                up: false,
                down: false
            },
            position: {
                x: -500 + Math.random() * 1000,
                y: -250 + Math.random() * 500
            }
        }
    };

    socket.emit('current-state', connectedUsers);

    connectedUsers[userID.toString()] = userData;

    socket.emit('init', userData, new Date().getTime());
    socket.broadcast.emit('join', userData);
    socket.emit('ping');

    broadcast_usersList();

    socket.on('name', function (newName) {
        connectedUsers[userID.toString()]['name'] = newName;
        broadcast_usersList();
    });

    socket.on('update-state', function (id, state) {
        connectedUsers[id.toString()]['state'] = state;
        socket.broadcast.emit('update-state', id, state);
    });

    var pingInterval = setInterval(function () {
        console.log('Ping', userID);
        lastPingTime = new Date().getTime();
        socket.emit('ping');
    }, 10000);

    socket.on('pong', function () {
        connectedUsers[userID.toString()]['ping'] = new Date().getTime() - lastPingTime;
        broadcast_usersList();
    });

    socket.on('disconnect', function () {
        console.log('user disconnected. ID:', userID);

        socket.broadcast.emit('leave', userID);

        clearInterval(pingInterval);

        delete connectedUsers[userID.toString()];

        broadcast_usersList();
    });
});

http.listen(3000, function () {
    console.log('Listening to *:3000');
});