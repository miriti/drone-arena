define(function () {
    var Weapon = function () {
        this.shotInterval = 300;
        this.fire = false;
        this.resetTime = true;

        this._shotIntervalTime = 0;
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
            this._shotIntervalTime = 0;
        }
    };

    /**
     * Update
     *
     * @param delta
     */
    Weapon.prototype.update = function (delta) {
        if (this.fire) {
            if (this._shotIntervalTime >= this.shotInterval) {
                this._shotIntervalTime = (this._shotIntervalTime - this.shotInterval);
                this.shot();
            } else {
                this._shotIntervalTime += delta;
            }
        }
    };

    /**
     * Shot
     */
    Weapon.prototype.shot = function () {

    };

    return Weapon;
});