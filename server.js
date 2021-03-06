var config = require('./server/config.js');
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

    socket.emit('sync-time', new Date().getTime());

    socket.emit('current-state', connectedUsers);

    var pingInterval;

    socket.on('join', function (name) {

        for (var id in connectedUsers) {
            if (connectedUsers[id]['name'].toLowerCase() == name.toLowerCase()) {
                name = 'Fake ' + name;
            }
        }

        var userData = {
            id: userID,
            name: name,
            frags: 0,
            ping: 0,
            state_timestamp: new Date().getTime(),
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
                },
                velocity: {
                    x: 0,
                    y: 0
                }
            }
        };

        connectedUsers[userID.toString()] = userData;

        socket.emit('init', userData);
        socket.broadcast.emit('join', userData);

        broadcast_usersList();

        pingInterval = setInterval(function () {
            lastPingTime = new Date().getTime();
            socket.emit('ping');
        }, 10000);

        socket.on('pong', function () {
            connectedUsers[userID.toString()]['ping'] = new Date().getTime() - lastPingTime;
            broadcast_usersList();
        });
    });

    socket.on('update-state', function (timestamp, id, state) {
        if (connectedUsers.hasOwnProperty(id.toString())) {
            connectedUsers[id.toString()]['state'] = state;
            socket.broadcast.emit('update-state', timestamp, id, state);
        }
    });

    socket.on('say', function (text) {
        socket.broadcast.emit('chat', userID, text);
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('leave', userID);

        clearInterval(pingInterval);

        delete connectedUsers[userID.toString()];

        broadcast_usersList();
    });
});

http.listen(config['http_port'], function () {
    console.log('Listening to *:%d', config['http_port']);
});