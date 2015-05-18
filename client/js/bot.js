define(['gameObject', 'lib/pixi/bin/pixi', 'time', 'util', 'vector', 'weapons/machinegun', 'view/drone'], function (GameObject, PIXI, Time, util, Vector, MachineGun, Drone) {
    function Bot(userID) {
        GameObject.call(this);

        this.userID = userID;

        this.state = {
            health: 100,
            position: {
                x: 0,
                y: 0
            },
            control: {
                left: false,
                right: false,
                up: false,
                down: false,
                fire: false,
                rotation: 0
            },
            velocity: {
                x: 0,
                y: 0
            }
        };

        this.stuff = {};

        this.gun = new MachineGun(this);

        this.view = new Drone();
        this.addChild(this.view);
    };

    Bot.prototype = Object.create(GameObject.prototype);
    Bot.prototype.constructor = Bot;

    Bot.prototype.setState = function (timestamp, state) {

        util.copyObject(state, this.state);
        for (var p in state) {
            this.state[p] = state[p];
        }

        this.x = state.position.x;
        this.y = state.position.y;

        for (var time in this.stuff) {
            if (time >= timestamp) {
                if (this.stuff[time].parent != null)
                    this.stuff[time].parent.removeChild(this.stuff[time]);
            }
        }
        this.stuff = {};

        if (Time.currentTime !== null) {
            var delta = Time.currentTime - timestamp;
            var updateRate = 1000 / 60;

            var upd = function (self, delta) {
                self.update(delta);

                for (var t in self.stuff) {
                    self.stuff[t].update(delta);
                }
            };

            while (delta > updateRate) {
                upd(this, updateRate);
                delta -= updateRate;
            }

            if (delta > 0) {
                upd(this, delta);
            }
        }
    };

    Bot.prototype.getState = function () {
        this.state.position.x = this.x;
        this.state.position.y = this.y;
        return this.state;
    };

    Bot.prototype.update = function (delta) {
        GameObject.prototype.update.call(this, delta);

        var ctrl = this.state.control;
        var self = this;

        if (!ctrl.left && !ctrl.right && !ctrl.up && !ctrl.down) {

        }

        var acceleration = 800;

        if (ctrl.left) {
            this.state.velocity.x -= acceleration * util.d(delta);
        }

        if (ctrl.right) {
            this.state.velocity.x += acceleration * util.d(delta);
        }

        if (ctrl.up) {
            this.state.velocity.y -= acceleration * util.d(delta);
        }

        if (ctrl.down) {
            this.state.velocity.y += acceleration * util.d(delta);
        }

        this.rotation = this.state.control.rotation;

        Vector.prototype.limit.call(this.state.velocity, 400);

        this.x += this.state.velocity.x * util.d(delta);
        this.y += this.state.velocity.y * util.d(delta);

        if (this.x < -1000) {
            this.x = -1000;
            this.state.velocity.x *= -1;
        }
        if (this.x > 1100) {
            this.x = 1100;
            this.state.velocity.x *= -1;
        }
        if (this.y < -1000) {
            this.y = -1000;
            this.state.velocity.y *= -1;
        }
        if (this.y > 1100) {
            this.y = 1100;
            this.state.velocity.y *= -1;
        }

        if ((this.gun.fire != this.state.control.fire) && (typeof this.state.control.fire !== 'undefined')) {
            if (this.gun.fire) {
                this.gun.endFire();
            } else {
                this.gun.startFire();
            }
        }

        this.gun.update(delta, function (projectile) {
            self.stuff[Time.currentTime] = projectile;
        });
    };

    Bot.prototype.hit = function (projectile) {
    };

    return Bot;
});