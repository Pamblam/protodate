
/**
 * Guess the format string belonging to a date string
 * @returns {string|false}
 */
(function(){
	"use strict";
	Date.guessFormat = function(dateStr){
		var tf, df, i, n;
		for(n=0; n<Date.DATE_FORMATS.length; n++){
			df = Date.DATE_FORMATS[n];
			if(Date.validateFormat(dateStr, df)) return df;
		}
		for(i=0; i<Date.TIME_FORMATS.length; i++){
			tf = Date.TIME_FORMATS[i];
			if(Date.validateFormat(dateStr, tf)) return tf;
			for(n=0; n<Date.DATE_FORMATS.length; n++){
				df = Date.DATE_FORMATS[n];
				if(Date.validateFormat(dateStr, df+" "+tf)) return df+" "+tf;
				if(Date.validateFormat(dateStr, tf+" "+df)) return tf+" "+df;
			}
		}
	};
})();