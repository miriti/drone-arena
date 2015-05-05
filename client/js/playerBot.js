define(['bot', 'input', 'net', 'util'], function (Bot, Input, net, util) {
    function PlayerBot(userID) {
        Bot.call(this, userID);
    };

    PlayerBot.prototype = Object.create(Bot.prototype);
    PlayerBot.prototype.constructor = Bot;

    PlayerBot.prototype.update = function (delta) {

        var lastControl = {};

        for (var c in this.control) {
            lastControl[c] = this.control[c];
        }

        this.control['left'] = Input.isLeft();
        this.control['right'] = Input.isRight();
        this.control['up'] = Input.isUp();
        this.control['down'] = Input.isDown();

        for (var c in this.control) {
            if (lastControl[c] !== this.control[c]) {
                net.sendState(this.userID, this.getState());
                break;
            }
        }


        Bot.prototype.update.call(this, delta);
    };

    return PlayerBot;
});