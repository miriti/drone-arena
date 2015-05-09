define(['bot', 'input', 'net', 'util', 'time'], function (Bot, Input, net, util, Time) {
    var PlayerBot = function (userID) {
        Bot.call(this, userID);

        this.stateSentTime = Time.currentTime;

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
            self.stateSentTime = Time.currentTime;
        });
    };

    PlayerBot.prototype = Object.create(Bot.prototype);
    PlayerBot.prototype.constructor = Bot;

    PlayerBot.prototype.update = function (delta) {

        if (Time.currentTime - this.stateSentTime > 1000) {
            net.sendState(this.userID, this.getState());
            this.stateSentTime = Time.currentTime;
        }

        this.control.left = Input.isLeft();
        this.control.right = Input.isRight();
        this.control.up = Input.isUp();
        this.control.down = Input.isDown();

        Bot.prototype.update.call(this, delta);
    };

    return PlayerBot;
});