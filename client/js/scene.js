define(['gameObject'], function (GameObject) {
    function Scene() {
        GameObject.call(this);
    }

    Scene.prototype = Object.create(GameObject.prototype);

    return Scene;
});