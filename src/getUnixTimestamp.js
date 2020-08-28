
/**
 * Return a unix timestamp for the given date
 * @returns {undefined}
 */
(function(){
	ProtoDate.prototype.getUnixTimestamp = function(){
		return ~~(this.getTime()/1000);
	};
})();