define(['gameObject', 'lib/pixi/bin/pixi'], function (GameObject, PIXI) {
    function Bot(userID) {
        GameObject.call(this);

        this.userID = userID;

        this.control = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        var gr = new PIXI.Graphics();
        gr.beginFill(0xffffff);
        gr.drawRect(-20, -20, 40, 40);
        gr.endFill();

        this.addChild(gr);
    };

    Bot.prototype = Object.create(GameObject.prototype);
    Bot.prototype.constructor = Bot;

    Bot.prototype.setState = function (state) {
        this.x = state.position.x;
        this.y = state.position.y;
        this.control = state.control;
    };

    Bot.prototype.getState = function () {
        return {
            control: this.control,
            position: {
                x: this.x,
                y: this.y
            }
        };
    };

    Bot.prototype.update = function (delta) {
        GameObject.prototype.update.call(this, delta);

        if (this.control.left) {
            this.x -= 100 * (delta / 1000);
        }

        if (this.control.right) {
            this.x += 100 * (delta / 1000);
        }

        if (this.control.up) {
            this.y -= 100 * (delta / 1000);
        }

        if (this.control.down) {
            this.y += 100 * (delta / 1000);
        }
    };

    return Bot;
});