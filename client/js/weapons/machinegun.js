define(['weapons/weapon', 'weapons/projectiles/bullet'], function (Weapon, Bullet) {
    var MachineGun = function (owner) {
        Weapon.call(this, owner);

        this.shotInterval = 50;
        this.projectileType = Bullet;
    };

    MachineGun.prototype = Object.create(Weapon.prototype);
    MachineGun.prototype.constructor = MachineGun;

    MachineGun.prototype.spawnProjectile = function () {
        var projectile = Weapon.prototype.spawnProjectile.call(this);
        // TODO Random should not be random!
        //projectile.rotation += -Math.PI / 128 + ((Math.PI / 64) * 2) * Math.random();
        return projectile;
    };

    return MachineGun;
});