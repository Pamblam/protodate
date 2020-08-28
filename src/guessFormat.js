
/**
 * Guess the format string belonging to a date string
 * @returns {string|false}
 */
(function(){
	"use strict";
	ProtoDate.guessFormat = function(dateStr){
		var tf, df, i, n;
		for(n=0; n<ProtoDate.DATE_FORMATS.length; n++){
			df = ProtoDate.DATE_FORMATS[n];
			if(ProtoDate.validateFormat(dateStr, df)) return df;
		}
		for(i=0; i<ProtoDate.TIME_FORMATS.length; i++){
			tf = ProtoDate.TIME_FORMATS[i];
			if(ProtoDate.validateFormat(dateStr, tf)) return tf;
			for(n=0; n<ProtoDate.DATE_FORMATS.length; n++){
				df = ProtoDate.DATE_FORMATS[n];
				if(ProtoDate.validateFormat(dateStr, df+" "+tf)) return df+" "+tf;
				if(ProtoDate.validateFormat(dateStr, tf+" "+df)) return tf+" "+df;
			}
		}
	};
})();