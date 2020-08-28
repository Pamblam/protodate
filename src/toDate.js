
/**
 * Get a native Date object from the ProtoDate object
 * @returns {object}
 */
(function(){
	"use strict";
	ProtoDate.prototype.toDate = function () {
		return new Date(this.getTime())
	};
})();