define(['gameObject', 'util', 'vector'], function (GameObject, util, Vector) {
    var Projectile = function (owner) {
        GameObject.call(this);

        this.owner = owner;
        this.velocity = {x: 0, y: 0};
        this.speed = 1000;
        this.life = 1000;
        this.hitPoints = 1;
    };

    Projectile.prototype = Object.create(GameObject.prototype);
    Projectile.prototype.constructor = Projectile;

    Projectile.prototype.launch = function () {
        this.velocity.x = Math.cos(this.rotation) * this.speed;
        this.velocity.y = Math.sin(this.rotation) * this.speed;
    };

    /**
     *
     * @param delta
     */
    Projectile.prototype.update = function (delta) {
        if (this.life > 0) {
            this.x += this.velocity.x * util.d(delta);
            this.y += this.velocity.y * util.d(delta);

            for (var id in this.parent.bots) {
                var b = this.parent.bots[id];
                if (b != this.owner) {
                    var v = new Vector(b.x - this.x, b.y - this.y);

                    if (v.length2() <= 30 * 30) {
                        b.hit(this);
                        this.parent.removeChild(this);
                        return;
                    }
                }
            }

            GameObject.prototype.update.call(this, delta);

            this.life -= delta;
        } else {
            this.parent.removeChild(this);
        }
    };

    return Projectile;
});