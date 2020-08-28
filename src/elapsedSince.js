
/**
 * Get an object representing the amount of time elapsed since the given date
 * @returns {object}
 */
(function(){
	"use strict";
	ProtoDate.prototype.elapsedSince = function (date) {
		if(!ProtoDate.isDate(date)) return false;
		var ms = Math.abs(this.getTime() - date.getTime()), o={};
		o.y = Math.floor(ms / ProtoDate.YEAR);
		ms -= o.y * ProtoDate.YEAR;
		o.d = Math.floor(ms / ProtoDate.DAY);
		ms -= o.d * ProtoDate.DAY;
		o.h = Math.floor(ms / ProtoDate.HOUR);
		ms -= o.h * ProtoDate.HOUR;
		o.m = Math.floor(ms / ProtoDate.MINUTE);
		ms -= o.m * ProtoDate.MINUTE;
		o.s = Math.floor(ms / ProtoDate.SECOND);
		ms -= o.s * ProtoDate.SECOND;
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