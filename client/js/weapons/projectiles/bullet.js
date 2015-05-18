define(['weapons/projectiles/projectile', 'lib/pixi/bin/pixi'], function (Projectile, PIXI) {
    var Bullet = function (owner) {
        Projectile.call(this, owner);

        var g = new PIXI.Graphics();
        g.beginFill(0xffffff);
        g.drawRect(-3, -1, 6, 2);
        g.endFill();

        this.addChild(g);
    };

    Bullet.prototype = Object.create(Projectile.prototype);
    Bullet.prototype.constructor = Bullet;

    return Bullet;
});