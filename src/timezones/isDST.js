
/**
 * Is the given date currently observing DST
 * @returns {undefined}
 */
(function(){
	Date.prototype.isDST = function(){
		var timezone = this.getTimezone();
		var timestamp = this.getUnixTimestamp();
		var tzdata = Date.getTZInfo(timestamp, timezone);
		return tzdata.dst == 1;
	};
})();