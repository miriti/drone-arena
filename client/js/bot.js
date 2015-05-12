define(['gameObject', 'lib/pixi/bin/pixi', 'time', 'util', 'vector', 'weapons/machinegun'], function (GameObject, PIXI, Time, util, Vector, MachineGun) {
    function Bot(userID) {
        GameObject.call(this);

        this.userID = userID;

        this.state = {
            position: {
                x: 0,
                y: 0
            },
            control: {
                left: false,
                right: false,
                up: false,
                down: false,
                fire: false
            },
            velocity: {
                x: 0,
                y: 0
            }
        };

        this.gun = new MachineGun();
        this.gun.shot = function () {
            console.log('Bang!');
        };

        var gr = new PIXI.Graphics();
        gr.beginFill(0xffffff);
        gr.drawRect(-10, -10, 20, 20);
        gr.endFill();

        this.addChild(gr);
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

        // TODO discard all created stuff to this point

        if (Time.currentTime !== null) {
            var delta = Time.currentTime - timestamp;
            var updateRate = 1000 / 60;

            while (delta > updateRate) {
                this.update(updateRate);
                delta -= updateRate;
            }

            if (delta > 0) this.update(delta);
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

        if (!ctrl.left && !ctrl.right && !ctrl.up && !ctrl.down) {
        }

        var acceletation = 800;

        if (ctrl.left) {
            this.state.velocity.x -= acceletation * util.d(delta);
        }

        if (ctrl.right) {
            this.state.velocity.x += acceletation * util.d(delta);
        }

        if (ctrl.up) {
            this.state.velocity.y -= acceletation * util.d(delta);
        }

        if (ctrl.down) {
            this.state.velocity.y += acceletation * util.d(delta);
        }

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

        this.gun.update(delta);
    };

    return Bot;
});