beforeEach(function() {
    this.addMatchers({
	toBeNumber: function() {
	    return Object.prototype.toString.call(this.actual) === '[object Number]';
	},

	toBeArray: function() {
	    return Object.prototype.toString.call(this.actual) === '[object Array]';
	}
    });
});

