define(['gameObject', 'lib/pixi/bin/pixi'], function (GameObject, PIXI) {
    var Drone = function () {
        GameObject.call(this);

        this.body = new PIXI.Sprite(PIXI.Texture.fromImage("sprites/drone-body.png"));
        this.body.anchor.set(0.5, 0.5);

        this.addChild(this.body);

        for (var x = 0; x < 2; x++) {
            for (var y = 0; y < 2; y++) {
                var propeller = new PIXI.Sprite(PIXI.Texture.fromImage('sprites/drone-propeller.png'));
                propeller.anchor.set(0.5, 0.5);
                propeller.x = -30 + ( 10 + x * 40);
                propeller.y = -30 + ( 12 + y * 40);

                propeller.update = function (delta) {
                    this.rotation += 1;
                };

                this.addChild(propeller);
            }
        }
    };

    Drone.prototype = Object.create(GameObject.prototype);
    Drone.prototype.constructor = Drone;

    return Drone;
});