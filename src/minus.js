
/**
 * Add a period of time
 * @returns {Date}
 */
(function(){
	"use strict";
	ProtoDate.prototype.minus = function(quantity, period){
		this.setTime(this.getTime() - (quantity * period));
		return this;
	};
})();