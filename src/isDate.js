
/**
 * Determine if a thing is a date
 * @returns {undefined}
 */
(function(){
	"use strict";
	Date.isDate = function(date){
		return 'function' === typeof date.getTime && !isNaN(date.getTime());
	};
})();