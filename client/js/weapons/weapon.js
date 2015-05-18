define(['weapons/projectiles/projectile'], function (Projectile) {
    var Weapon = function (owner) {
        this.owner = owner;
        this.shotInterval = 250;
        this.fire = false;
        this.resetTime = true;
        this.projectileType = Projectile;

        this._shotIntervalTime = 0;
    };

    /**
     * Spawn projectile
     * @returns {Projectile}
     */
    Weapon.prototype.spawnProjectile = function () {
        var projectile = new this.projectileType(this.owner);
        projectile.x = this.owner.x;
        projectile.y = this.owner.y;
        projectile.rotation = this.owner.rotation;

        return projectile;
    };

    /**
     * Start the fire
     */
    Weapon.prototype.startFire = function () {
        this.fire = true;
    };

    /**
     * End the fire
     */
    Weapon.prototype.endFire = function () {
        this.fire = false;
        if (this.resetTime) {
            this._shotIntervalTime = this.shotInterval;
        }
    };

    /**
     * Update
     *
     * @param delta
     */
    Weapon.prototype.update = function (delta, projectileCallback) {
        if (this.fire) {
            if (this._shotIntervalTime >= this.shotInterval) {
                this._shotIntervalTime = (this._shotIntervalTime - this.shotInterval);
                var projectile = this.shot();

                if (projectileCallback) {
                    projectileCallback(projectile);
                }
            } else {
                this._shotIntervalTime += delta;
            }
        }
    };

    /**
     * Shot
     */
    Weapon.prototype.shot = function () {
        var projectile = this.spawnProjectile();
        projectile.launch();
        this.owner.parent.addChild(projectile);

        return projectile;
    };

    return Weapon;
});