require(['lib/pixi/bin/pixi', '/socket.io/socket.io.js'], function (PIXI, io) {

    var socket = io();

    var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight);
    document.body.innerHTML = '';
    document.body.appendChild(renderer.view);
});