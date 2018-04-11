
/**
 * Add a period of time
 * @returns {Date}
 */
(function(){
	"use strict";
	Date.prototype.plus = function(quantity, period){
		this.setTime(this.getTime() + (quantity * period));
		return this;
	};
})();