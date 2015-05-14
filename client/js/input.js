define(['time', 'keys'], function (Time, Keys) {
    var Input = {
        keysPressed: [],
        callbacks: [],
        currentState: {
            left: false,
            right: false,
            up: false,
            down: false,
            rotation: 0,
            fire: false
        },
        keyMap: {
            left: [Keys.LEFT_ARROW, Keys.A],
            right: [Keys.RIGHT_ARROW, Keys.D],
            up: [Keys.UP_ARROW, Keys.W],
            down: [Keys.DOWN_ARROW, Keys.S]
        },
        observers: [],
        notify: function () {
            for (var i in this.observers) {
                this.observers[i].call(null, Time.currentTime, this.controls);
            }
        },
        updateKey: function (key, state) {
            for (var ctrl in this.keyMap) {
                if (['left', 'right', 'up', 'down'].indexOf(ctrl) != -1) {
                    for (var ctrlKey in this.keyMap[ctrl]) {
                        if (this.keyMap[ctrl][ctrlKey] == key) {
                            if (this.currentState[ctrl] != state) {
                                this.currentState[ctrl] = state;
                                this.notify();
                            }
                        }
                    }
                }
            }
        },
        onKeyDown: function (e) {
            this.updateKey(e.keyCode, true);
        },
        onKeyUp: function (e) {
            this.updateKey(e.keyCode, false);
        },
        init: function (object) {
            var self = this;
            object.addEventListener('keydown', function (e) {
                self.onKeyDown(e);
            });

            object.addEventListener('keyup', function (e) {
                self.onKeyUp(e);
            });

            object.addEventListener('mousemove', function (e) {
                var newRotation = Math.atan2(e.pageY - window.innerHeight / 2, e.pageX - window.innerWidth / 2);
                if (self.currentState.rotation != newRotation) {
                    self.currentState.rotation = newRotation;
                    self.notify();
                }
            });

            object.addEventListener('mousedown', function (e) {
                if (!self.currentState.fire) {
                    self.currentState.fire = true;
                    self.notify();
                }
            });

            object.addEventListener('mouseup', function (e) {
                if (self.currentState.fire) {
                    self.currentState.fire = false;
                    self.notify();
                }
            });
        }
    };

    for (var i = 0; i < 256; i++) {
        Input.keysPressed[i] = false;
    }

    return Input;
});