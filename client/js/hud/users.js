define(['../gameObject', '../lib/pixi/bin/pixi'], function (GameObject, PIXI) {
    var UserItem = function (data) {
        PIXI.Container.call(this);

        var userName = new PIXI.Text(data['name'], {font: 'normal 14px Courier New, monospace', fill: '#eee'});
        var userFrags = new PIXI.Text(data['frags'], {font: 'normal 14px Courier New, monospace', fill: '#faa'});
        userFrags.x = 150;


        var userPing = new PIXI.Text(data['ping'], {font: 'normal 14px Courier New, monospace', fill: '#aff'});
        userPing.x = 220;

        this.addChild(userName);
        this.addChild(userFrags);
        this.addChild(userPing);
    };

    UserItem.prototype = Object.create(PIXI.Container.prototype);
    UserItem.prototype.constructor = UserItem;

    var Users = function () {
        GameObject.call(this);

        this.table = [];

        this.addChild(new UserItem({
            name: 'User:',
            frags: 'Frags:',
            ping: 'Latency:'
        }));
    };

    Users.prototype = Object.create(GameObject.prototype);
    Users.prototype.constructor = Users;

    Users.prototype.updateList = function (users) {
        for (var i in this.table) {
            this.removeChild(this.table[i]);
            this.table.splice(i, 1);
        }

        var y = 0;
        for (var i in users) {
            var item = new UserItem(users[i]);
            item.y = 20 + y * 20;
            y++;
            this.addChild(item);
            this.table.push(item);
        }
    };

    return Users;
});