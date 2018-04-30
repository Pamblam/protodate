
/**
 * Set the timezone of a given date
 * @returns {Date}
 */
(function(){
	Date.prototype.setTimezone = function(timezone){
		var timestamp = this.getUnixTimestamp();
		var tzdata = Date.getTZInfo(timestamp, timezone);
		var date = new Date((timestamp+tzdata.gmt_offset)*1000);
		this.getFullYear=function(){return date.getUTCFullYear();};
		this.getMonth=function(){return date.getUTCMonth();};
		this.getDate=function(){return date.getUTCDate();};
		this.getHours=function(){return date.getUTCHours();};
		this.getMinutes=function(){return date.getUTCMinutes();};
		this.getSeconds=function(){return date.getUTCSeconds();};
		this.getMilliseconds=function(){return date.getUTCMilliseconds();};
		this.getTimezoneOffset=function(){return tzdata.gmt_offset/60;};
		this.toString = function(){
			var s = tzdata.gmt_offset < 0 ? "-" : "+";
			var offset = "GMT"+s+(("0"+Math.abs(tzdata.gmt_offset/3600)).substr(-2))+"00";
			return this.format("D M d Y H:i:s")+" "+offset+" ("+tzdata.abbr+")";
		};
		this.toDateString=function(){return this.format("D M d Y");};
		this._timezone = timezone;
		return this;
	};
})();