define(['gameObject', 'net', 'bot', 'playerBot'], function (GameObject, net, Bot, PlayerBot) {
    /**
     *
     * @constructor
     */
    function Arena() {
        GameObject.call(this);

        this.bots = {};

        this.playerBot = null;

        var self = this;

        net.on('current-state', function (connectedUsers) {
            for (var userID in connectedUsers) {
                if (!self.bots.hasOwnProperty(userID.toString())) {
                    var newBot = self.spawnBot(userID, connectedUsers[userID]['state_timestamp'], connectedUsers[userID]['state'], Bot);

                    self.addBot(userID, newBot);
                }
            }
        });

        net.on('init', function (userData) {
            var newBot = self.spawnBot(userData['id'], userData['state_timestamp'], userData['state'], PlayerBot);

            self.addBot(userData.id, newBot);

            self.playerBot = newBot;
        });

        net.on('join', function (userData) {
            self.addBot(userData.id, self.spawnBot(userData['id'], userData['state_timestamp'], userData['state'], Bot));
        });

        net.on('leave', function (userID) {
            self.removeBot(userID);
        });

        net.on('update-state', function (data) {
            self.bots[data['userID'].toString()].setState(data['timestamp'], data['state']);
        });
    }

    Arena.prototype = Object.create(GameObject.prototype);
    Arena.prototype.constructor = Arena;

    Arena.prototype.spawnBot = function (id, timestamp, state, botClass) {
        var newBot = new botClass(id);
        newBot.setState(timestamp, state);
        return newBot;
    };

    Arena.prototype.addBot = function (userID, bot) {
        if (!this.bots.hasOwnProperty(userID.toString())) {
            this.bots[userID.toString()] = bot;
            this.addChild(bot);
        }
    };

    Arena.prototype.removeBot = function (userID) {
        if (this.bots.hasOwnProperty(userID.toString())) {
            this.removeChild(this.bots[userID.toString()]);
            delete this.bots[userID.toString()];
        }
    };

    Arena.prototype.update = function (delta) {
        GameObject.prototype.update.call(this, delta);

        if (this.playerBot !== null) {
            this.x = -this.playerBot.x;
            this.y = -this.playerBot.y;
        }
    };

    return Arena;
});