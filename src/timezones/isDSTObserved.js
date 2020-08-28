
/**
 * Is DST observed in the given timezone
 * @returns {undefined}
 */
(function(){
	ProtoDate.isDSTObserved = function(timezone){
		if(undefined === ProtoDate.TZData[timezone]) throw new Error("No such timezone: "+timezone);
		var data = ProtoDate.TZData[timezone];
		var l = data.length;
		for(var i=l; i--;){
			if(data[i][3] == 0) continue;
			DSTObserved = true;
			break;
		}
		return DSTObserved;
	};
})();