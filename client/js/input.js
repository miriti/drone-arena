define(['time', 'keys'], function (Time, Keys) {
    var Input = {
        keysPressed: [],
        onKeyDown: function (e) {
            this.keysPressed[e.keyCode] = this.keysPressed[e.keyCode] || Time.currentTime;
        },
        onKeyUp: function (e) {
            this.keysPressed[e.keyCode] = 0;
        },
        isLeft: function () {
            return this.keysPressed[Keys.LEFT_ARROW] || this.keysPressed[Keys.A];
        },
        isRight: function () {
            return this.keysPressed[Keys.RIGHT_ARROW] || this.keysPressed[Keys.D];
        },
        isUp: function () {
            return this.keysPressed[Keys.UP_ARROW] || this.keysPressed[Keys.W];
        },
        isDown: function () {
            return this.keysPressed[Keys.DOWN_ARROW] || this.keysPressed[Keys.S];
        },
        init: function (object) {
            var self = this;
            object.addEventListener('keydown', function (e) {
                e.preventDefault();
                self.onKeyDown(e);
            });

            object.addEventListener('keyup', function (e) {
                e.preventDefault();
                self.onKeyUp(e);
            });

            object.addEventListener('mousemove', function (e) {
            });
        }
    };

    for (var i = 0; i < 256; i++) {
        Input.keysPressed[i] = false;
    }

    return Input;
});