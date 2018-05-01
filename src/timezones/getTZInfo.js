
/**
 * Get information about a specific timezone
 * @returns {Object}
 */
(function(){
	Date.getTZInfo = function(unix_timestamp, timezone){
		var row;
		if(undefined === Date.TZData[timezone]) throw new Error("No such timezone: "+tz);
		var l = Date.TZData[timezone].length-1;
		var row = Date.TZData[timezone][l];
		for(var i=l; i--;){
			if(Date.TZData[timezone][i][1] > unix_timestamp) continue;
			row = Date.TZData[i];
			break;
		}
		return {abbr:row[0], time_start:row[1], gmt_offset:row[2], dst:row[3]};
	};
})();