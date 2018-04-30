
/**
 * Get information about a specific timezone
 * @returns {Object}
 */
(function(){
	Date.getTZInfo = function(unix_timestamp, timezone){
		var row;
		for(var i=Date.TZData.length; i--;){
			if(Date.TZData[i][1] > unix_timestamp || timezone !== Date.TZData[i][4]) continue;
			row = Date.TZData[i];
			break;
		}
		if(undefined === row) throw new Error("No such timezone: "+tz);
		return {abbr:row[0], time_start:row[1], gmt_offset:row[2], dst:row[3]};
	};
})();