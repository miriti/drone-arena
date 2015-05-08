define(['bot', 'input', 'net', 'util'], function (Bot, Input, net, util) {
    var PlayerBot = function (userID) {
        Bot.call(this, userID);

        this.control = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        var self = this;
        Object.observe(this.control, function (changes) {
            util.copyObject(self.control, self.state.control);
            net.sendState(self.userID, self.getState());
        });
    };

    PlayerBot.prototype = Object.create(Bot.prototype);
    PlayerBot.prototype.constructor = Bot;

    PlayerBot.prototype.update = function (delta) {
        this.control.left = Input.isLeft();
        this.control.right = Input.isRight();
        this.control.up = Input.isUp();
        this.control.down = Input.isDown();

        Bot.prototype.update.call(this, delta);
    };

    return PlayerBot;
});