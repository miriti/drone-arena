define(['query', 'keys', 'util', 'net'], function ($, Keys, util, net) {
    return {
        blur: function () {
            $('#chat-message').blur();
        },
        show: function () {
            $('.chat-window').style.display = 'block';
            $('.show-chat').style.display = 'none';
        },
        hide: function () {
            $('.chat-window').style.display = 'none';
            $('.show-chat').style.display = 'block';
        },
        msg: function (name, text) {
            $('#chat-log').innerHTML += '<div><span class="name">' + name + '</span>: ' + util.stripHtml(text) + '</div>';
            $('#chat-log').scrollTop = $('#chat-log').scrollHeight;
        },
        sysMsg: function (msg) {
            $('#chat-log').innerHTML += '<div><span class="name system">SYSTEM</span>: ' + msg + '</div>';
            $('#chat-log').scrollTop = $('#chat-log').scrollHeight;
        },
        init: function () {
            var self = this;
            $('#chat-message').onkeydown = function (event) {
                event.stopPropagation();
                if (event.keyCode == Keys.ESCAPE) {
                    this.blur();
                }

                if (event.keyCode == Keys.ENTER) {
                    self.msg(net.usersList[net.userID]['name'], this.value);
                    net.say(this.value);
                    this.value = '';
                }
            };

            $('.chat-window .hide-chat').onclick = function (e) {
                self.hide();
                e.preventDefault();
            };

            $('.show-chat a').onclick = function (e) {
                self.show();
                e.preventDefault();
            };

            net.on('chat', function (data) {
                self.msg(net.usersList[data['userID']]['name'], data['text']);
            });

            net.on('leave', function (userId) {
                self.sysMsg('<strong>' + net.usersList[userId]['name'] + '</strong> has left the game');
            });

            net.on('join', function (data) {
                self.sysMsg('<strong>' + data['name'] + '</strong> joined the game');
            });
        }
    }
});