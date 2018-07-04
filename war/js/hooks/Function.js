Function.prototype.inherit = function(parentClass) {
    this.prototype = new parentClass();
    this.prototype.constructor = this;
    this.prototype.parent = parentClass.prototype
};
var virtual = function() {
    throw "This method must be implemented."
};