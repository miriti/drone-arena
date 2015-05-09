define(['query', 'keys', 'net', 'util'], function ($, Keys, net, util) {
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
        }
    }
});