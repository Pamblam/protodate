
/**
 * Get an object representing the amount of time elapsed since the given date
 * @returns {object}
 */
(function(){
	"use strict";
	Date.prototype.elapsedSince = function (date) {
		if(!Date.isDate(date)) return false;
		var ms = Math.abs(this.getTime() - date.getTime()), o={};
		o.y = Math.floor(ms / Date.YEAR);
		ms -= o.y * Date.YEAR;
		o.d = Math.floor(ms / Date.DAY);
		ms -= o.d * Date.DAY;
		o.h = Math.floor(ms / Date.HOUR);
		ms -= o.h * Date.HOUR;
		o.m = Math.floor(ms / Date.MINUTE);
		ms -= o.m * Date.MINUTE;
		o.s = Math.floor(ms / Date.SECOND);
		ms -= o.s * Date.SECOND;
		o.ms = ms;
		o.verbose = function() {
			var str = [];
			if (o.y) str.push(o.y + " year" + (o.y > 1 ? "s" : ""));
			if (o.d) str.push(o.d + " day" + (o.d > 1 ? "s" : ""));
			if (o.h) str.push(o.h + " hour" + (o.h > 1 ? "s" : ""));
			if (o.m) str.push(o.m + " minute" + (o.m > 1 ? "s" : ""));
			if (o.s) str.push(o.s + " second" + (o.s > 1 ? "s" : ""));
			if (str.length > 1) str[str.length - 1] = "and " + str[str.length - 1];
			return str.join(', ');
		};
		o.clock = function(ms){ return [o.h, o.m, ms ? o.s+"."+(("00" + o.ms).substr(-3)):+o.s].join(':') };
		return o;
	};
})();