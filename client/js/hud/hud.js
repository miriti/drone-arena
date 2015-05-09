define(['../gameObject', '../net', 'hud/users'], function (GameObject, net, Users) {
    var HUD = function () {
        GameObject.call(this);

        var usersTable = new Users();
        usersTable.x = 5;
        usersTable.y = 5;

        this.addChild(usersTable);

        net.on('users-list', function (list) {
            usersTable.updateList(list);
        })
    };

    HUD.prototype = Object.create(GameObject.prototype);
    HUD.prototype.constructor = HUD;

    return HUD;
});