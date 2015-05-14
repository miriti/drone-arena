define(['weapons/weapon', 'util'], function (Weapon, util) {
    var MachineGun = function () {
        Weapon.call(this);
    };

    util.extend(MachineGun, Weapon, {

    });

    return MachineGun;
});