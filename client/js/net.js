define(['/socket.io/socket.io.js', 'time'], function (io, Time) {
    function Net() {
        this.socket = null;
        this.eventListeners = {};
    }

    Net.prototype.fire = function (event, data) {
        if (this.eventListeners.hasOwnProperty(event)) {
            for (var i in this.eventListeners[event]) {
                this.eventListeners[event][i].call(null, data);
            }
        }
    };

    Net.prototype.connect = function () {
        this.socket = io();

        var self = this;

        this.socket.on('sync-time', function (timestamp) {
            Time.currentTime = timestamp;
        });

        this.socket.on('current-state', function (connectedUsers) {
            console.log(connectedUsers);
            self.fire('current-state', connectedUsers);
        });

        this.socket.on('init', function (userData) {
            self.fire('init', userData);
        });

        this.socket.on('join', function (userData) {
            console.log(userData['name'], 'has joined the game');
            self.fire('join', userData);
        });

        this.socket.on('leave', function (userID) {
            self.fire('leave', userID);
        });

        this.socket.on('users-list', function (updatedList) {
            self.fire('users-list', updatedList);
        });

        this.socket.on('update-state', function (timestamp, userID, state) {
            self.fire('update-state', {timestamp: timestamp, userID: userID, state: state});
        });

        this.socket.on('ping', function () {
            self.socket.emit('pong');
        });
    };

    Net.prototype.on = function (event, handler) {
        this.eventListeners[event] = this.eventListeners[event] || [];
        this.eventListeners[event].push(handler);
    };

    Net.prototype.sendState = function (userID, state) {
        this.socket.emit('update-state', Time.currentTime, userID, state);
    };

    Net.prototype.join = function (name) {
        this.socket.emit('join', name);
    };

    return new Net();
});