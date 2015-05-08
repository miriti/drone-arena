define(['gameObject', 'lib/pixi/bin/pixi', 'time', 'util', 'vector'], function (GameObject, PIXI, Time, util, Vector) {
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
                down: false
            },
            velocity: {
                x: 0,
                y: 0
            }
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

        var acceletation = 1000;

        if (this.state.control.left) {
            this.state.velocity.x -= acceletation * util.d(delta);
        }

        if (this.state.control.right) {
            this.state.velocity.x += acceletation * util.d(delta);
        }

        if (this.state.control.up) {
            this.state.velocity.y -= acceletation * util.d(delta);
        }

        if (this.state.control.down) {
            this.state.velocity.y += acceletation * util.d(delta);
        }

        Vector.prototype.limit.call(this.state.velocity, 300);

        this.x += this.state.velocity.x * util.d(delta);
        this.y += this.state.velocity.y * util.d(delta);
    };

    return Bot;
});