
/**
 * Is DST observed in the given timezone
 * @returns {undefined}
 */
(function(){
	Date.isDSTObserved = function(timezone){
		var DSTObserved = false;
		for(var i=Date.TZData.length; i--;){
			if(Date.TZData[i][3] == 0 || timezone !== Date.TZData[i][4]) continue;
			DSTObserved = true;
			break;
		}
		return DSTObserved;
	};
})();