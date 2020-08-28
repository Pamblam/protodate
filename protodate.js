/**
 * protodate (lite) - v3.0.6
 * Better Javascript Dates.
 * @author Rob Parham
 * @website https://github.com/Pamblam/protodate
 * @license Apache-2.0
 */


class ProtoDate extends Date{}

(function(){
	"use strict";
	ProtoDate.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	ProtoDate.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	ProtoDate.PROTODATE_VERSION = '3.0.6';
	ProtoDate.MILLISECOND = 1;
	ProtoDate.SECOND = 1000;
	ProtoDate.MINUTE = 60000;
	ProtoDate.HOUR = 3600000;
	ProtoDate.DAY = 86400000;
	ProtoDate.YEAR = 31536000000;
	ProtoDate.TIME_FORMATS = [
		"G00 \\h\\o\\u\\r\\s", "g \\o\\c\\l\\o\\c\\k", "g \\o \\c\\l\\o\\c\\k", 
		"g i", "g i a", "g i A", "g i s", "g i s a", "g i s A", "h i", "h i a", 
		"h i A", "h i s", "h i s a", "h i s A", "H i", "H i a", "H i A", "H i s", 
		"G i", "G i a", "G i A", "G i s", "g i s v", "g i s a v", "g i s A v", 
		"h i s v", "h i s a v", "h i s A v", "H i s v", "G i s v"
	];
	ProtoDate.DATE_FORMATS = [
		"y", "Y", "F", "M", "F Y", "F y", "M Y", "M y", "F jS Y", "F jS", 
		"M jS Y", "M jS", "F j Y", "F j", "M j Y", "M j", "jS F Y", "jS F", 
		"jS M Y", "jS M", "j F Y", "j F", "j M Y", "j M", "Y m d", "m d y", 
		"m d Y", "Y n d", "n d y", "n d Y", "Y m j", "m j y", "m j Y", "Y n j", 
		"n j y", "n j Y", "D Y m d", "D m d y", "D m d Y", "D Y n d", "D n d y", 
		"D n d Y", "D Y m j", "D m j y", "D m j Y", "D Y n j", "D n j y", 
		"D n j Y", "l Y m d", "l m d y", "l m d Y", "l Y n d", "l n d y", 
		"l n d Y", "l Y m j", "l m j y", "l m j Y", "l Y n j", "l n j y", 
		"l n j Y"
	];
})();

/**
 * Return a unix timestamp for the given date
 * @returns {undefined}
 */
(function(){
	ProtoDate.prototype.getUnixTimestamp = function(){
		return ~~(this.getTime()/1000);
	};
})();

/**
 * Determine if a thing is a date
 * @returns {bool}
 */
(function(){
	"use strict";
	ProtoDate.isDate = function(date){
		return 'function' === typeof date.getTime && !isNaN(date.getTime());
	};
})();

/**
 * Format a date
 * @param {Date} date - A Javascript Date object
 * @param {String} format - The format of the outputted date
 * @returns {String} - The formatted date
 */
(function(){
	"use strict";
	ProtoDate.prototype.format = function(format) {
		if (!ProtoDate.isDate(this)) return false;
		var buffer = []; 
		for(var i=0; i<format.length; i++){
			switch(format[i]){
				// If the current char is a "\" then skip it and add then next literal char
				case "\\": buffer.push(format[++i]); break;

				// Symbols that represent numbers
				case "Y": buffer.push("" + this.getFullYear()); break;
				case "y": buffer.push(("" + this.getFullYear()).substring(2)); break;
				case "m": buffer.push(("0" + (this.getMonth() + 1)).substr(-2, 2)); break;
				case "n": buffer.push("" + (this.getMonth() + 1)); break;
				case "t": buffer.push("" + new ProtoDate(this.getFullYear(), this.getMonth() + 1, 0).getDate()); break; 
				case "d": buffer.push(("0" + this.getDate()).substr(-2, 2)); break;
				case "j": buffer.push(this.getDate() + ""); break;
				case "w": buffer.push(this.getDay()); break;
				case "g": buffer.push("" + (this.getHours() > 12 ? this.getHours() - 12 : this.getHours())); break;
				case "G": buffer.push("" + (this.getHours())); break;
				case "h": buffer.push(("0" + (this.getHours() > 12 ? this.getHours() - 12 : this.getHours())).substr(-2, 2)); break;
				case "H": buffer.push(("0" + (this.getHours()+"")).substr(-2, 2)); break;
				case "i": buffer.push(("0" + this.getMinutes()).substr(-2, 2)); break;
				case "s": buffer.push(("0" + this.getSeconds()).substr(-2, 2)); break;
				case "N": buffer.push(this.getDay()==0?7:this.getDay()); break;
				case "L": buffer.push((this.getFullYear() % 4 == 0 && this.getFullYear() % 100 != 0) || this.getFullYear() % 400 == 0 ? "1" : "0"); break;
				case "o": buffer.push(this.getMonth()==0&&this.getDate()<6&&this.getDay()<4?this.getFullYear()-1:this.getFullYear()); break;
				case "B": buffer.push(Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24)); break;
				case "v": buffer.push((this.getTime()+"").substr(-3)); break;
				case "Z": buffer.push(this.getTimezoneOffset()*60); break;
				case "U": buffer.push(Math.floor(this.getTime()/1000)); break;

				// Symbols that represent text
				case "a": buffer.push(this.getHours() > 11 ? "pm" : "am"); break;
				case "A": buffer.push(this.getHours() > 11 ? "PM" : "AM"); break;
				case "l": buffer.push(ProtoDate.DAYS[this.getDay()]); break;
				case "D": buffer.push(ProtoDate.DAYS[this.getDay()].substr(0, 3)); break;
				case "F": buffer.push(ProtoDate.MONTHS[this.getMonth()]); break;
				case "M": buffer.push(ProtoDate.MONTHS[this.getMonth()].substring(0, 3)); break;
				case "c": buffer.push(this.toISOString()); break;

				// Ordinal suffix
				case "S":
					var suffix = false;
					var ones = buffer[buffer.length-1].toString()[1];
					var tens = buffer[buffer.length-1].toString()[0];
					if(undefined === ones){
					  ones = tens;
					  tens = null;
					} 
					if(ones == "1") suffix = "st";
					if(ones == "2") suffix = "nd";
					if(ones == "3") suffix = "rd";
					if(tens == "1" || !suffix) suffix = "th";
					buffer.push(suffix);
					break;

				// ISO-8601 Week number
				case "W":
					var startDate = new ProtoDate(this.getFullYear(), 0);
					var endDate = new ProtoDate(this.getFullYear(), this.getMonth(), this.getDate());
					while(endDate.getDay() < 6) endDate.setDate(endDate.getDate()+1);
					endDate = endDate.getTime();
					var weekNo = 0;
					while(startDate.getTime() < endDate){
						if(startDate.getDay() == 4) weekNo++;
						startDate.setDate(startDate.getDate()+1);
					}
					buffer.push(weekNo);
					break;

				// Day of the year
				case "z":
					var startDate = new ProtoDate(this.getFullYear(), 0, 1, 0, 0, 0, 0);
					var dayNo = 0;
					while(startDate.getTime() < this.getTime()){
						dayNo++;
						startDate.setDate(startDate.getDate()+1);
					}
					buffer.push(dayNo);
					break;
				
				// Julian Day
				case "J":
					var y = parseInt(this.format("Y"));
					var m = parseInt(this.format("n"));
					if(m === 1 || m === 2){
						y -= 1;
						m += 12;
					}
					var d = parseInt(this.format("j"));
					var a = Math.floor(y/100);
					var b = Math.floor(a/4);
					var c = 2-a+b;
					var e = Math.floor(365.25*(y+4716));
					var f = Math.floor(30.6001*(m+1));
					buffer.push(c+d+e+f-1524.5);
					break;
					
				// Moon Phase
				case "P":
					var jd = this.format("J");
					var dsn = jd - 2451549.5;
					var nm = dsn / 29.53;
					var dic = parseFloat("0."+((nm+"").split(".")[1])) * 29.53;
					if(dic > 27.65625) return "New Moon";
					if(dic > 23.96875) return "Waning Crescent";
					if(dic > 20.28125) return "Third Quarter";
					if(dic > 16.59375) return "Waning Gibbous";
					if(dic > 12.90625) return "Full Moon";
					if(dic > 9.21875) return "Waxing Gibbous";
					if(dic > 5.53125) return "First Quarter";
					if(dic > 1.84375) return "Waxing Crescent";
					return "New Moon";
					break;
				
				default: buffer.push(format[i]); break;
			}
		}
		return buffer.join('');
	};
})();

/**
 * Validate a date string against a format string
 * @returns {bool}
 */
(function(){
	"use strict";
	ProtoDate.validateFormat = function(dateStr, formatStr){
		for(var i=0; i<formatStr.length; i++){
			switch(formatStr[i]){
				case "\\": 
					if(formatStr[++i] !== dateStr[0]) return false;
					dateStr = dateStr.substr(1);
					break;
				case "Y":
					if(!/^(\d){4}/.test(dateStr)) return false;
					dateStr = dateStr.substr(4);
					break;
				case "y":
					if(!/^(\d){2}/.test(dateStr)) return false;
					dateStr = dateStr.substr(2);
					break;
				case "m":
				case "h":
					if(!/^(\d){2}/.test(dateStr) || +dateStr.substr(0,2)>12 || !+dateStr.substr(0,2)) return false;
					dateStr = dateStr.substr(2);
					break;
				case "n":
				case "g":
					var m = dateStr.match(/^(\d){1,2}/)||[];
					if(!m.length || +m[0]>12 || !+m[0]) return false;
					dateStr = dateStr.substr(m[0].length);
					break;
				case "d":
					if(!/^(\d){2}/.test(dateStr) || +dateStr.substr(0,2)>31 || !+dateStr.substr(0,2)) return false;
					dateStr = dateStr.substr(2);
					break;
				case "j":
					var m = dateStr.match(/^(\d){1,2}/)||[];
					if(!m.length || +m[0]>31 || !+m[0]) return false;
					dateStr = dateStr.substr(m[0].length);
					break;
				case "G":
					var m = dateStr.match(/^(\d){1,2}/)||[];
					if(!m.length || +m[0]>23) return false;
					dateStr = dateStr.substr(m[0].length);
					break;
				case "H":
					if(!/^(\d){2}/.test(dateStr) || +dateStr.substr(0,2)>23) return false;
					dateStr = dateStr.substr(2);
					break;
				case "i":
				case "s":
					if(!/^(\d){2}/.test(dateStr) || +dateStr.substr(0,2)>59) return false;
					dateStr = dateStr.substr(2);
					break;
				case "v":
					if(!/^(\d){3}/.test(dateStr)) return false;
					dateStr = dateStr.substr(3);
					break;
				case "a":
				case "A":
					var m = dateStr.substr(0,2).toLowerCase();
					if(!~['am','pm'].indexOf(m)) return false;
					dateStr = dateStr.substr(2);
					break;
				case "l":
					var d = dateStr.toLowerCase(), day=false;
					for(var n=0; n<ProtoDate.DAYS.length; n++){
						if(!d.indexOf(ProtoDate.DAYS[n].toLowerCase())){
							day = ProtoDate.DAYS[n];
							break;
						}
					}
					if(!day) return false;
					dateStr = dateStr.substr(day.length);
					break;
				case "D":
					var d = dateStr.toLowerCase(), abrlen = 0;
					for(var n=0; n<ProtoDate.DAYS.length; n++){
						if(ProtoDate.DAYS[n].length>6 && !d.indexOf(ProtoDate.DAYS[n].toLowerCase().substr(0,6))){
							abrlen = 6; break;
						}
						if(!d.indexOf(ProtoDate.DAYS[n].toLowerCase().substr(0,5))){
							abrlen = 5; break;
						}
						if(!d.indexOf(ProtoDate.DAYS[n].toLowerCase().substr(0,4))){
							abrlen = 4; break;
						}
						if(!d.indexOf(ProtoDate.DAYS[n].toLowerCase().substr(0,3))){
							abrlen = 3; break;
						}
					}
					if(!abrlen) return false;
					dateStr = dateStr.substr(abrlen);
					break;
				case "F":
					var m = dateStr.toLowerCase(), mm=false;
					for(var n=0; n<ProtoDate.MONTHS.length; n++){
						if(!m.indexOf(ProtoDate.MONTHS[n].toLowerCase())){
							mm = ProtoDate.MONTHS[n];
							break;
						}
					}
					if(!mm) return false;
					dateStr = dateStr.substr(mm.length);
					break;
				case "M":
					var m = dateStr.toLowerCase(), mm=false;
					for(var n=0; n<ProtoDate.MONTHS.length; n++){
						if(!m.indexOf(ProtoDate.MONTHS[n].toLowerCase().substr(0,3))){
							mm = ProtoDate.MONTHS[n];
							break;
						}
					}
					if(!mm) return false;
					dateStr = dateStr.substr(3);
					break;
				case "S":
					if(!~['st','nd','rd','th'].indexOf(dateStr.toLowerCase().substr(0,2))) return false;
					dateStr = dateStr.substr(2);
					break;
				default: 
					if(formatStr[i] !== dateStr[0]) return false;
					dateStr = dateStr.substr(1);
					break;
			}
		}
		return !dateStr.trim().length;
	};
})();

/**
 * Creates a new Date object from the given string
 * @returns {Date|false}
 */
(function(){
	"use strict";
	ProtoDate.parse = function(dateStr, formatStr){
		if(!formatStr){
			dateStr = dateStr.replace(/\W+/g, " ").trim();
			formatStr = ProtoDate.guessFormat(dateStr);
			if(!formatStr) return false;
		}
		if(!ProtoDate.validateFormat(dateStr, formatStr)) return false;
		var now = new ProtoDate();
		var year = now.getFullYear(), 
			month = now.getMonth(), 
			day = now.getDate(), 
			hours = now.getHours(), 
			minutes = now.getMinutes(), 
			seconds = now.getSeconds(), 
			milliseconds = now.getMilliseconds(),
			am=true, hr24=false;
		for(var i=0; i<formatStr.length; i++){
			switch(formatStr[i]){
				case "\\": dateStr = dateStr.substr(2); i=i+2; break;
				case "Y": year = dateStr.substr(0,4); dateStr = dateStr.substr(4); break;
				case "y":
					var cy = (""+new Date().getFullYear()).substr(2);
					var y = dateStr.substr(0,2);
					year = (y>cy?"19":"20")+y;
					dateStr = dateStr.substr(2);
					break;
				case "m":
					month = dateStr.substr(0,2)-1;
					dateStr = dateStr.substr(2);
					break;
				case "n":
					var m = dateStr.match(/^(\d){1,2}/)[0];
					month = m-1;
					dateStr = dateStr.substr(m.length);
					break;
				case "d":
					day = +dateStr.substr(0,2);
					dateStr = dateStr.substr(2);
					break;
				case "j":
					var m = dateStr.match(/^(\d){1,2}/)[0];
					day = +m;
					dateStr = dateStr.substr(m.length);
					break;
				case "g":
					var h = dateStr.match(/^(\d){1,2}/)[0];
					hours = h == 12 ? 0 : +h;
					dateStr = dateStr.substr(h.length);
					break;
				case "G":
					hr24 = true;
					var h = dateStr.match(/^(\d){1,2}/)[0];
					hours = +h;
					dateStr = dateStr.substr(h.length);
					break;
				case "h":
					var h = dateStr.substr(0,2);
					hours = h == 12 ? 0 : +h;
					dateStr = dateStr.substr(2);
					break;
				case "H":
					hr24 = true;
					hours = +dateStr.substr(0,2);
					dateStr = dateStr.substr(2);
					break;
				case "i":
					minutes = +dateStr.substr(0,2);
					dateStr = dateStr.substr(2);
					break;
				case "s":
					seconds = +dateStr.substr(0,2);
					dateStr = dateStr.substr(2);
					break;
				case "v":
					milliseconds = +dateStr.substr(0,3);
					dateStr = dateStr.substr(3);
					break;
				case "a":
				case "A":
					if("pm" == dateStr.substr(0,2).toLowerCase()) am=false;
					break;
				case "l":
					var d = dateStr.toLowerCase(), dd=false;
					for(var n=0; n<ProtoDate.DAYS.length; n++){
						dd = ProtoDate.DAYS[n];
						if(!d.indexOf(dd.toLowerCase())) break;
					}
					dateStr = dateStr.substr(dd.length);
					break;
				case "D":
					var d = dateStr.toLowerCase(), abrlen = 0;
					for(var n=0; n<ProtoDate.DAYS.length; n++){
						if(ProtoDate.DAYS[n].length>6 && !d.indexOf(ProtoDate.DAYS[n].toLowerCase().substr(0,6))){
							abrlen = 6; break;
						}
						if(!d.indexOf(ProtoDate.DAYS[n].toLowerCase().substr(0,5))){
							abrlen = 5; break;
						}
						if(!d.indexOf(ProtoDate.DAYS[n].toLowerCase().substr(0,4))){
							abrlen = 4; break;
						}
						if(!d.indexOf(ProtoDate.DAYS[n].toLowerCase().substr(0,3))){
							abrlen = 3; break;
						}
					}
					dateStr = dateStr.substr(abrlen);
					break;
				case "F":
					var m = dateStr.toLowerCase(), mm=false, idx=0;
					for(var n=0; n<ProtoDate.MONTHS.length; n++){
						if(!m.indexOf(ProtoDate.MONTHS[n].toLowerCase())){
							mm = ProtoDate.MONTHS[n];
							idx = n;
							break;
						}
					}
					month = idx;
					dateStr = dateStr.substr(mm.length);
					break;
				case "M":
					var m = dateStr.toLowerCase(), mm=false, idx =0;
					for(var n=0; n<ProtoDate.MONTHS.length; n++){
						if(!m.indexOf(ProtoDate.MONTHS[n].toLowerCase().substr(0,3))){
							mm = ProtoDate.MONTHS[n];
							break;
						}
					}
					month = idx;
					dateStr = dateStr.substr(3);
					break;
				case "S":
					dateStr = dateStr.substr(2);
					break;
				default: dateStr = dateStr.substr(1); break;
			}
		}
		if(!am && !hr24) hours+=12;
		return new ProtoDate(year, month, day, hours, minutes, seconds, milliseconds);
	};
})();

/**
 * Get an object representing the amount of time elapsed since the given date
 * @returns {object}
 */
(function(){
	"use strict";
	ProtoDate.prototype.elapsedSince = function (date) {
		if(!ProtoDate.isDate(date)) return false;
		var ms = Math.abs(this.getTime() - date.getTime()), o={};
		o.y = Math.floor(ms / ProtoDate.YEAR);
		ms -= o.y * ProtoDate.YEAR;
		o.d = Math.floor(ms / ProtoDate.DAY);
		ms -= o.d * ProtoDate.DAY;
		o.h = Math.floor(ms / ProtoDate.HOUR);
		ms -= o.h * ProtoDate.HOUR;
		o.m = Math.floor(ms / ProtoDate.MINUTE);
		ms -= o.m * ProtoDate.MINUTE;
		o.s = Math.floor(ms / ProtoDate.SECOND);
		ms -= o.s * ProtoDate.SECOND;
		o.ms = ms;
		o.verbose = function() {
			var str = [];
			if (o.y) str.push(o.y + " year" + (o.y > 1 ? "s" : ""));
			if (o.d) str.push(o.d + " day" + (o.d > 1 ? "s" : ""));
			if (o.h) str.push(o.h + " hour" + (o.h > 1 ? "s" : ""));
			if (o.m) str.push(o.m + " minute" + (o.m > 1 ? "s" : ""));
			if (o.s) str.push(o.s + " second" + (o.s > 1 ? "s" : ""));
			if (str.length > 1) str[str.length - 1] = "and " + str[str.length - 1];
			return str.join(', ');
		};
		o.clock = function(ms){ return [o.h, o.m, ms ? o.s+"."+(("00" + o.ms).substr(-3)):+o.s].join(':') };
		return o;
	};
})();

/**
 * Add a period of time
 * @returns {Date}
 */
(function(){
	"use strict";
	ProtoDate.prototype.minus = function(quantity, period){
		this.setTime(this.getTime() - (quantity * period));
		return this;
	};
})();

/**
 * Add a period of time
 * @returns {Date}
 */
(function(){
	"use strict";
	ProtoDate.prototype.plus = function(quantity, period){
		this.setTime(this.getTime() + (quantity * period));
		return this;
	};
})();

/**
 * Guess the format string belonging to a date string
 * @returns {string|false}
 */
(function(){
	"use strict";
	ProtoDate.guessFormat = function(dateStr){
		var tf, df, i, n;
		for(n=0; n<ProtoDate.DATE_FORMATS.length; n++){
			df = ProtoDate.DATE_FORMATS[n];
			if(ProtoDate.validateFormat(dateStr, df)) return df;
		}
		for(i=0; i<ProtoDate.TIME_FORMATS.length; i++){
			tf = ProtoDate.TIME_FORMATS[i];
			if(ProtoDate.validateFormat(dateStr, tf)) return tf;
			for(n=0; n<ProtoDate.DATE_FORMATS.length; n++){
				df = ProtoDate.DATE_FORMATS[n];
				if(ProtoDate.validateFormat(dateStr, df+" "+tf)) return df+" "+tf;
				if(ProtoDate.validateFormat(dateStr, tf+" "+df)) return tf+" "+df;
			}
		}
	};
})();

/**
 * Get a native Date object from the ProtoDate object
 * @returns {object}
 */
(function(){
	"use strict";
	ProtoDate.prototype.toDate = function () {
		return new Date(this.getTime())
	};
})();

/**
 * Get a native Date object from the ProtoDate object
 * @returns {object}
 */
(function(){
	"use strict";
	ProtoDate.fromDate = function (date) {
		if(!ProtoDate.isDate(date)) throw new Error("ProtoDate.fromDate expects a Date object.");
		return new ProtoDate(date.getTime());
	};
})();

/* istanbul ignore next */
if(!!(typeof module !== 'undefined' && module.exports)) module.exports = ProtoDate;