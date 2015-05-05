define(['gameObject'], function (GameObject) {
    function Scene() {
        GameObject.call(this);
    }

    Scene.prototype = Object.create(GameObject.prototype);

    Scene.prototype.update = function (timestamp) {
        for (var i in this.children) {
            if (this.children[i].update) {
                this.children[i].update(timestamp);
            }
        }
    };

    return Scene;
});