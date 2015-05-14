require(['lib/pixi/bin/pixi', 'gameObject', 'scene', 'time', 'net', 'arena', 'input', 'keys', 'hud/hud', 'chat', 'query', 'util'], function (PIXI, GameObject, Scene, Time, net, Arena, Input, Keys, HUD, Chat, $, util) {

    var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);


    $('#canvas-container').innerHTML = '';
    $('#canvas-container').appendChild(renderer.view);

    renderer.view.onclick = function (e) {
        Chat.blur();
    };

    var stage = new GameObject();

    var scene = new Scene();

    scene.addChild(new Arena());

    stage.addChild(scene);
    stage.addChild(new HUD());

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

            stage.update(Time.delta);
        }
        renderer.render(stage);
        requestAnimationFrame(animationFrame);
    }

    animationFrame();

    net.connect();

    var joinWithName = function (e) {
        var name = util.stripHtml(($('#user-name-input').value).trim());

        $('#user-name-input').value = name;

        if (name.length >= 3) {
            $('#name-dialog').style.display = 'none';
            net.join(name);
            Input.init(window);
            Chat.show();
        } else {
            alert('3 characters minimum');
        }
    };

    var modals = document.querySelectorAll('div.modal-container');

    for (var i = 0; i < modals.length; i++) {
        modals[i].onkeydown = function (e) {
            if (e.keyCode == Keys.ESCAPE) {
                this.style.display = 'none';
            }
        }
    }

    $('#join-button').onclick = joinWithName;
    $('#user-name-input').onkeydown = function (e) {
        if (e.keyCode == 13) {
            joinWithName();
        }
    };

    $('#name-dialog').style.display = 'block';

    Chat.init();
});