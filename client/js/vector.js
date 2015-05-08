define(function () {
    var Vector = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Vector.prototype.length = function () {
        return Math.sqrt(this.length2());
    };

    Vector.prototype.length2 = function () {
        return this.x * this.x + this.y * this.y
    };

    Vector.prototype.limit = function (lenght) {
        var l = Math.sqrt(this.x * this.x + this.y * this.y);

        if (l > lenght) {
            this.x /= l;
            this.y /= l;

            this.x *= lenght;
            this.y *= lenght;
        }
    };

    return Vector;
});