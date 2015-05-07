require(['lib/pixi/bin/pixi', 'scene', 'time', 'net', 'arena', 'input'], function (PIXI, Scene, Time, net, Arena, Input) {

    var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);

    document.querySelector('#canvas-container').innerHTML = '';
    document.querySelector('#canvas-container').appendChild(renderer.view);

    var scene = new Scene();

    scene.addChild(new Arena());

    var lastTime = new Date().getTime();

    window.onresize = function () {
        renderer.resize(window.innerWidth, window.innerHeight);
        scene.x = window.innerWidth / 2;
        scene.y = window.innerHeight / 2;
    };

    window.onresize();

    // Loop
    function animationFrame() {
        if (Time.currentTime !== null) {
            var currentTime = new Date().getTime();
            Time.update(currentTime - lastTime);
            lastTime = currentTime;

            scene.update(Time.delta);
        }
        renderer.render(scene);
        requestAnimationFrame(animationFrame);
    }

    animationFrame();

    net.connect();

    document.querySelector('#join-button').onclick = function (e) {
        var name = (document.querySelector('#user-name-input').value).trim();
        if (name.length >= 3) {
            document.querySelector('#modal-container').style.display = 'none';
            net.join(name);
            Input.init(window);
        } else {
            alert('3 characters minimum');
        }
    }
});