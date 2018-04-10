
/**
 * Add a period of time
 * @returns Date obj
 */
(function(){
	"use strict";
	Date.prototype.minus = function(quantity, period){
		this.setTime(this.getTime() - (quantity * period));
		return this;
	};
})();