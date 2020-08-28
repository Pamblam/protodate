
/**
 * Get a native Date object from the ProtoDate object
 * @returns {object}
 */
(function(){
	"use strict";
	ProtoDate.fromDate = function (date) {
		if(!ProtoDate.isDate(date)) throw new Error("ProtoDate.fromDate expects a Date object.");
		return new ProtoDate(date.getTime());
	};
})();