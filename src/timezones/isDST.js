
/**
 * Is the given date currently observing DST
 * @returns {undefined}
 */
(function(){
	ProtoDate.prototype.isDST = function(){
		var timezone = this.getTimezone();
		var timestamp = this.getUnixTimestamp();
		var tzdata = ProtoDate.getTZInfo(timestamp, timezone);
		return tzdata.dst == 1;
	};
})();