define(function () {
    return {
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
        compareObjects: function (obj1, obj2) {
            if ((typeof  obj1 === 'object') && (typeof obj2 === 'object')) {
                var result = true;
                for (var f in obj1) {
                    if (obj2.hasOwnProperty(f)) {
                        result &= this.compareObjects(obj1[f], obj2[f]);
                    } else {
                        return false;
                    }
                }
                return result;
            } else {
                return obj1 === obj2;
            }
        },
        xor: function (a, b) {
            return ( a ? 1 : 0 ) ^ ( b ? 1 : 0 );
        }
    }
});