define(function () {
    return {
        copyObject: function (from, to) {
            for (var k in from) {
                if ((typeof from[k] === 'object') && (typeof to[k] === 'object')) {
                    this.copyObject(from[k], to[k]);
                } else {
                    to[k] = from[k];
                }
            }
        },
        cloneObject: function (obj) {
            if (typeof obj === 'object') {
                var newObject = {};

                for (var f in obj) {
                    newObject[f] = this.cloneObject(obj[f]);
                }
            } else {
                return obj;
            }
        },
        xor: function (a, b) {
            return ( a ? 1 : 0 ) ^ ( b ? 1 : 0 );
        },
        d: function (delta) {
            return delta / 1000;
        }
    }
});