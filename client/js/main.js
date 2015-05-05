require(['lib/pixi/bin/pixi', 'scene', 'time', 'net', 'arena'], function (PIXI, Scene, Time, net, Arena) {

    var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    document.body.innerHTML = '';
    document.body.appendChild(renderer.view);

    var scene = new Scene();

    scene.addChild(new Arena());

    var lastTime = new Date().getTime();

    window.onresize = function () {
        renderer.resize(window.innerWidth, window.innerHeight);
        scene.x = window.innerWidth / 2;
        scene.y = window.innerHeight / 2;
    };

    window.onresize();

    function animationFrame() {
        var currentTime = new Date().getTime();

        Time.update(currentTime - lastTime);
        lastTime = currentTime;

        scene.update(Time.delta);
        renderer.render(scene);
        requestAnimationFrame(animationFrame);
    }

    animationFrame();

    net.connect();
});