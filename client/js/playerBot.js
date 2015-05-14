define(['bot', 'input', 'net', 'util', 'time'], function (Bot, Input, net, util, Time) {
    var PlayerBot = function (userID) {
        Bot.call(this, userID);

        this.stateSentTime = Time.currentTime;

        var self = this;

        Input.observers.push(function (timestamp, controls) {
            util.copyObject(Input.currentState, self.state.control);
            net.sendState(self.userID, self.getState());
        });
    };

    PlayerBot.prototype = Object.create(Bot.prototype);
    PlayerBot.prototype.constructor = Bot;

    PlayerBot.prototype.update = function (delta) {

        if (Time.currentTime - this.stateSentTime > 1000) {
            net.sendState(this.userID, this.getState());
            this.stateSentTime = Time.currentTime;
        }

        Bot.prototype.update.call(this, delta);
    };

    return PlayerBot;
});