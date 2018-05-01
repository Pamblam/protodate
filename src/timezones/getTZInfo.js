
/**
 * Get information about a specific timezone
 * @returns {Object}
 */
(function(){
	Date.getTZInfo = function(unix_timestamp, timezone){
		var row;
		if(undefined === Date.TZData[timezone]) throw new Error("No such timezone: "+timezone);
		var data = Date.TZData[timezone];
		var l = data.length;
		var row;
		for(var i=l; i--;){
			if(data[i][1] > unix_timestamp) continue;
			row = data[i];
			break;
		}
		return {abbr:row[0], time_start:row[1], gmt_offset:row[2], dst:row[3]};
	};
})();