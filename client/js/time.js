define(function () {
    var Time = {
        currentTime: null,
        delta: 0,
        update: function (delta) {
            this.delta = delta;
            this.currentTime += delta;
        }
    };

    return Time;
});