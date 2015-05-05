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

        this.socket.on('current-state', function (connectedUsers) {
            self.fire('current-state', connectedUsers);
        });

        this.socket.on('init', function (userData, timestamp) {
            Time.currentTime = timestamp;
            self.fire('init', userData);
        });

        this.socket.on('join', function (userData) {
            self.fire('join', userData);
        });

        this.socket.on('leave', function (userID) {
            self.fire('leave', userID);
        });

        this.socket.on('users-list', function (updatedList) {
            self.fire('users-list', updatedList);
        });

        this.socket.on('update-state', function (userID, state) {
            self.fire('update-state', {userID: userID, state: state});
        });

        this.socket.on('ping', function () {
            self.socket.emit('pong');
        });
    };

    Net.prototype.changeName = function (newName) {
        this.socket.emit('name', newName);
    };

    Net.prototype.on = function (event, handler) {
        this.eventListeners[event] = this.eventListeners[event] || [];
        this.eventListeners[event].push(handler);
    };

    Net.prototype.sendState = function (userID, state) {
        this.socket.emit('update-state', userID, state);
    };

    return new Net();
});