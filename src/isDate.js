
/**
 * Determine if a thing is a date
 * @returns {undefined}
 */
(function(){
	"use strict";
	Date.isDate = function(date){
		return !isNaN(date.getTime());
	};
})();