var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);

server.use(express.static('client'));

io.on('connection', function (socket) {
    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('Listening to *:3000');
});