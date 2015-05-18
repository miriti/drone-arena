define(['/socket.io/socket.io.js', 'time'], function (io, Time) {
    function Net() {
        this.socket = null;
        this.eventListeners = {};
        this.userID = null;
        this.usersList = null;
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
            self.fire('current-state', connectedUsers);
        });

        this.socket.on('init', function (userData) {
            self.userID = userData['id'];
            self.fire('init', userData);
        });

        this.socket.on('join', function (userData) {
            self.fire('join', userData);
        });

        this.socket.on('leave', function (userID) {
            self.fire('leave', userID);
        });

        this.socket.on('users-list', function (updatedList) {
            self.usersList = updatedList;
            self.fire('users-list', updatedList);
        });

        this.socket.on('update-state', function (timestamp, userID, state) {
            self.fire('update-state', {timestamp: timestamp, userID: userID, state: state});
        });

        this.socket.on('ping', function () {
            self.socket.emit('pong');
        });

        this.socket.on('chat', function (userID, text) {
            self.fire('chat', {
                userID: userID,
                text: text
            });
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

    Net.prototype.say = function (text) {
        this.socket.emit('say', text);
    };

    return new Net();
});