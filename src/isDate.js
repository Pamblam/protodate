
/**
 * Determine if a thing is a date
 * @returns {bool}
 */
(function(){
	"use strict";
	ProtoDate.isDate = function(date){
		return 'function' === typeof date.getTime && !isNaN(date.getTime());
	};
})();