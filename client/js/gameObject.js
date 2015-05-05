define(['lib/pixi/bin/pixi', 'input'], function (PIXI, Input) {
    function GameObject() {
        PIXI.Container.call(this);
    }

    GameObject.prototype = Object.create(PIXI.Container.prototype);
    GameObject.prototype.constructor = GameObject;

    GameObject.prototype.update = function (delta) {
        for (var i in this.children) {
            if (this.children[i].update) {
                this.children[i].update(delta);
            }
        }
    };

    return GameObject;
});