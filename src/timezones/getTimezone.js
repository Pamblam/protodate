
/**
 * Get the timezone of the date
 * @returns {String}
 */
(function(){
	Date.prototype.getTimezone = function(){
		return this._timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
	};
})();