/**
 * protodate (timezones 2012-2022) - v3.0.6
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
 
(function(){
	ProtoDate.TZData = {
		// "zone_name": [["abbreviation", "time_start", "gmt_offset", "dst"],...]
		"Africa/Abidjan": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Accra": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Addis_Ababa": [
			["EAT", -4260211200, 10800, 0],
		],
		"Africa/Algiers": [
			["PMT", -4260211200, 561, 0],
		],
		"Africa/Asmara": [
			["EAT", -4260211200, 10800, 0],
		],
		"Africa/Bamako": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Bangui": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Banjul": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Bissau": [
			["-01", -4260211200, -3600, 0],
		],
		"Africa/Blantyre": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Brazzaville": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Bujumbura": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Cairo": [
			["EEST", 1400191200, 10800, 1],
			["EET", 1403816400, 7200, 0],
			["EEST", 1406844000, 10800, 1],
			["EET", 1411678800, 7200, 0],
		],
		"Africa/Casablanca": [
			["WEST", 1335664800, 3600, 1],
			["WET", 1342749600, 0, 0],
			["WEST", 1345428000, 3600, 1],
			["WET", 1348970400, 0, 0],
			["WEST", 1367114400, 3600, 1],
			["WET", 1373162400, 0, 0],
			["WEST", 1376100000, 3600, 1],
			["WET", 1382839200, 0, 0],
			["WEST", 1396144800, 3600, 1],
			["WET", 1403920800, 0, 0],
			["WEST", 1406944800, 3600, 1],
			["WET", 1414288800, 0, 0],
			["WEST", 1427594400, 3600, 1],
			["WET", 1434247200, 0, 0],
			["WEST", 1437271200, 3600, 1],
			["WET", 1445738400, 0, 0],
			["WEST", 1459044000, 3600, 1],
			["WET", 1465092000, 0, 0],
			["WEST", 1468116000, 3600, 1],
			["WET", 1477792800, 0, 0],
			["WEST", 1490493600, 3600, 1],
			["WET", 1495332000, 0, 0],
			["WEST", 1498960800, 3600, 1],
			["WET", 1509242400, 0, 0],
			["WEST", 1521943200, 3600, 1],
			["WET", 1526176800, 0, 0],
			["WEST", 1529200800, 3600, 1],
			["WET", 1540692000, 0, 0],
			["WEST", 1553997600, 3600, 1],
			["WET", 1557021600, 0, 0],
			["WEST", 1560045600, 3600, 1],
			["WET", 1572141600, 0, 0],
			["WEST", 1585447200, 3600, 1],
			["WET", 1587261600, 0, 0],
			["WEST", 1590285600, 3600, 1],
			["WET", 1603591200, 0, 0],
			["WEST", 1616896800, 3600, 1],
			["WET", 1618106400, 0, 0],
			["WEST", 1621130400, 3600, 1],
			["WET", 1635645600, 0, 0],
			["WEST", 1651975200, 3600, 1],
			["WET", 1667095200, 0, 0],
		],
		"Africa/Ceuta": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Africa/Conakry": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Dakar": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Dar_es_Salaam": [
			["EAT", -4260211200, 10800, 0],
		],
		"Africa/Djibouti": [
			["EAT", -4260211200, 10800, 0],
		],
		"Africa/Douala": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/El_Aaiun": [
			["WEST", 1335664800, 3600, 1],
			["WET", 1342749600, 0, 0],
			["WEST", 1345428000, 3600, 1],
			["WET", 1348970400, 0, 0],
			["WEST", 1367114400, 3600, 1],
			["WET", 1373162400, 0, 0],
			["WEST", 1376100000, 3600, 1],
			["WET", 1382839200, 0, 0],
			["WEST", 1396144800, 3600, 1],
			["WET", 1403920800, 0, 0],
			["WEST", 1406944800, 3600, 1],
			["WET", 1414288800, 0, 0],
			["WEST", 1427594400, 3600, 1],
			["WET", 1434247200, 0, 0],
			["WEST", 1437271200, 3600, 1],
			["WET", 1445738400, 0, 0],
			["WEST", 1459044000, 3600, 1],
			["WET", 1465092000, 0, 0],
			["WEST", 1468116000, 3600, 1],
			["WET", 1477792800, 0, 0],
			["WEST", 1490493600, 3600, 1],
			["WET", 1495332000, 0, 0],
			["WEST", 1498960800, 3600, 1],
			["WET", 1509242400, 0, 0],
			["WEST", 1521943200, 3600, 1],
			["WET", 1526176800, 0, 0],
			["WEST", 1529200800, 3600, 1],
			["WET", 1540692000, 0, 0],
			["WEST", 1553997600, 3600, 1],
			["WET", 1557021600, 0, 0],
			["WEST", 1560045600, 3600, 1],
			["WET", 1572141600, 0, 0],
			["WEST", 1585447200, 3600, 1],
			["WET", 1587261600, 0, 0],
			["WEST", 1590285600, 3600, 1],
			["WET", 1603591200, 0, 0],
			["WEST", 1616896800, 3600, 1],
			["WET", 1618106400, 0, 0],
			["WEST", 1621130400, 3600, 1],
			["WET", 1635645600, 0, 0],
			["WEST", 1651975200, 3600, 1],
			["WET", 1667095200, 0, 0],
		],
		"Africa/Freetown": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Gaborone": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Harare": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Johannesburg": [
			["SAST", -4260211200, 5400, 0],
		],
		"Africa/Juba": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Kampala": [
			["EAT", -4260211200, 10800, 0],
		],
		"Africa/Khartoum": [
			["CAT", 1509483600, 7200, 0],
		],
		"Africa/Kigali": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Kinshasa": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Lagos": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Libreville": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Lome": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Luanda": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Lubumbashi": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Lusaka": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Malabo": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Maputo": [
			["CAT", -4260211200, 7200, 0],
		],
		"Africa/Maseru": [
			["SAST", -4260211200, 5400, 0],
		],
		"Africa/Mbabane": [
			["SAST", -4260211200, 5400, 0],
		],
		"Africa/Mogadishu": [
			["EAT", -4260211200, 10800, 0],
		],
		"Africa/Monrovia": [
			["MMT", -4260211200, -2588, 0],
		],
		"Africa/Nairobi": [
			["EAT", -4260211200, 10800, 0],
		],
		"Africa/Ndjamena": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Niamey": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Nouakchott": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Ouagadougou": [
			["GMT", -4260211200, 0, 0],
		],
		"Africa/Porto-Novo": [
			["WAT", -4260211200, 3600, 0],
		],
		"Africa/Sao_Tome": [
			["WAT", 1514768400, 3600, 0],
		],
		"Africa/Tripoli": [
			["CET", 1352505600, 3600, 0],
			["CEST", 1364515200, 7200, 1],
			["EET", 1382659200, 7200, 0],
		],
		"Africa/Tunis": [
			["PMT", -4260211200, 561, 0],
		],
		"Africa/Windhoek": [
			["WAT", 1333238400, 3600, 0],
			["WAST", 1346547600, 7200, 1],
			["WAT", 1365292800, 3600, 0],
			["WAST", 1377997200, 7200, 1],
			["WAT", 1396742400, 3600, 0],
			["WAST", 1410051600, 7200, 1],
			["WAT", 1428192000, 3600, 0],
			["WAST", 1441501200, 7200, 1],
			["WAT", 1459641600, 3600, 0],
			["WAST", 1472950800, 7200, 1],
			["WAT", 1491091200, 3600, 0],
			["CAT", 1504400400, 7200, 0],
		],
		"America/Adak": [
			["HDT", 1331467200, -32400, 1],
			["HST", 1352026800, -36000, 0],
			["HDT", 1362916800, -32400, 1],
			["HST", 1383476400, -36000, 0],
			["HDT", 1394366400, -32400, 1],
			["HST", 1414926000, -36000, 0],
			["HDT", 1425816000, -32400, 1],
			["HST", 1446375600, -36000, 0],
			["HDT", 1457870400, -32400, 1],
			["HST", 1478430000, -36000, 0],
			["HDT", 1489320000, -32400, 1],
			["HST", 1509879600, -36000, 0],
			["HDT", 1520769600, -32400, 1],
			["HST", 1541329200, -36000, 0],
			["HDT", 1552219200, -32400, 1],
			["HST", 1572778800, -36000, 0],
			["HDT", 1583668800, -32400, 1],
			["HST", 1604228400, -36000, 0],
			["HDT", 1615723200, -32400, 1],
			["HST", 1636282800, -36000, 0],
			["HDT", 1647172800, -32400, 1],
			["HST", 1667732400, -36000, 0],
		],
		"America/Anchorage": [
			["AKDT", 1331463600, -28800, 1],
			["AKST", 1352023200, -32400, 0],
			["AKDT", 1362913200, -28800, 1],
			["AKST", 1383472800, -32400, 0],
			["AKDT", 1394362800, -28800, 1],
			["AKST", 1414922400, -32400, 0],
			["AKDT", 1425812400, -28800, 1],
			["AKST", 1446372000, -32400, 0],
			["AKDT", 1457866800, -28800, 1],
			["AKST", 1478426400, -32400, 0],
			["AKDT", 1489316400, -28800, 1],
			["AKST", 1509876000, -32400, 0],
			["AKDT", 1520766000, -28800, 1],
			["AKST", 1541325600, -32400, 0],
			["AKDT", 1552215600, -28800, 1],
			["AKST", 1572775200, -32400, 0],
			["AKDT", 1583665200, -28800, 1],
			["AKST", 1604224800, -32400, 0],
			["AKDT", 1615719600, -28800, 1],
			["AKST", 1636279200, -32400, 0],
			["AKDT", 1647169200, -28800, 1],
			["AKST", 1667728800, -32400, 0],
		],
		"America/Anguilla": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Antigua": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Araguaina": [
			["-02", 1350788400, -7200, 1],
			["-03", 1361066400, -10800, 0],
		],
		"America/Argentina/Buenos_Aires": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/Catamarca": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/Cordoba": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/Jujuy": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/La_Rioja": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/Mendoza": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/Rio_Gallegos": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/Salta": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/San_Juan": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/San_Luis": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/Tucuman": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Argentina/Ushuaia": [
			["CMT", -4260211200, -15408, 0],
		],
		"America/Aruba": [
			["-0430", -4260211200, -16200, 0],
		],
		"America/Asuncion": [
			["-04", 1333854000, -14400, 0],
			["-03", 1349582400, -10800, 1],
			["-04", 1364094000, -14400, 0],
			["-03", 1381032000, -10800, 1],
			["-04", 1395543600, -14400, 0],
			["-03", 1412481600, -10800, 1],
			["-04", 1426993200, -14400, 0],
			["-03", 1443931200, -10800, 1],
			["-04", 1459047600, -14400, 0],
			["-03", 1475380800, -10800, 1],
			["-04", 1490497200, -14400, 0],
			["-03", 1506830400, -10800, 1],
			["-04", 1521946800, -14400, 0],
			["-03", 1538884800, -10800, 1],
			["-04", 1553396400, -14400, 0],
			["-03", 1570334400, -10800, 1],
			["-04", 1584846000, -14400, 0],
			["-03", 1601784000, -10800, 1],
			["-04", 1616900400, -14400, 0],
			["-03", 1633233600, -10800, 1],
			["-04", 1648350000, -14400, 0],
			["-03", 1664683200, -10800, 1],
		],
		"America/Atikokan": [
			["CST", -4260211200, -21600, 0],
		],
		"America/Bahia": [
			["-03", 1330221600, -10800, 0],
		],
		"America/Bahia_Banderas": [
			["CDT", 1333267200, -18000, 1],
			["CST", 1351407600, -21600, 0],
			["CDT", 1365321600, -18000, 1],
			["CST", 1382857200, -21600, 0],
			["CDT", 1396771200, -18000, 1],
			["CST", 1414306800, -21600, 0],
			["CDT", 1428220800, -18000, 1],
			["CST", 1445756400, -21600, 0],
			["CDT", 1459670400, -18000, 1],
			["CST", 1477810800, -21600, 0],
			["CDT", 1491120000, -18000, 1],
			["CST", 1509260400, -21600, 0],
			["CDT", 1522569600, -18000, 1],
			["CST", 1540710000, -21600, 0],
			["CDT", 1554624000, -18000, 1],
			["CST", 1572159600, -21600, 0],
			["CDT", 1586073600, -18000, 1],
			["CST", 1603609200, -21600, 0],
			["CDT", 1617523200, -18000, 1],
			["CST", 1635663600, -21600, 0],
			["CDT", 1648972800, -18000, 1],
			["CST", 1667113200, -21600, 0],
		],
		"America/Barbados": [
			["BMT", -4260211200, -14309, 0],
		],
		"America/Belem": [
			["-03", -4260211200, -10800, 0],
		],
		"America/Belize": [
			["CST", -4260211200, -21600, 0],
		],
		"America/Blanc-Sablon": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Boa_Vista": [
			["-04", -4260211200, -14400, 0],
		],
		"America/Bogota": [
			["BMT", -4260211200, -17776, 0],
		],
		"America/Boise": [
			["MDT", 1331456400, -21600, 1],
			["MST", 1352016000, -25200, 0],
			["MDT", 1362906000, -21600, 1],
			["MST", 1383465600, -25200, 0],
			["MDT", 1394355600, -21600, 1],
			["MST", 1414915200, -25200, 0],
			["MDT", 1425805200, -21600, 1],
			["MST", 1446364800, -25200, 0],
			["MDT", 1457859600, -21600, 1],
			["MST", 1478419200, -25200, 0],
			["MDT", 1489309200, -21600, 1],
			["MST", 1509868800, -25200, 0],
			["MDT", 1520758800, -21600, 1],
			["MST", 1541318400, -25200, 0],
			["MDT", 1552208400, -21600, 1],
			["MST", 1572768000, -25200, 0],
			["MDT", 1583658000, -21600, 1],
			["MST", 1604217600, -25200, 0],
			["MDT", 1615712400, -21600, 1],
			["MST", 1636272000, -25200, 0],
			["MDT", 1647162000, -21600, 1],
			["MST", 1667721600, -25200, 0],
		],
		"America/Cambridge_Bay": [
			["MDT", 1331456400, -21600, 1],
			["MST", 1352016000, -25200, 0],
			["MDT", 1362906000, -21600, 1],
			["MST", 1383465600, -25200, 0],
			["MDT", 1394355600, -21600, 1],
			["MST", 1414915200, -25200, 0],
			["MDT", 1425805200, -21600, 1],
			["MST", 1446364800, -25200, 0],
			["MDT", 1457859600, -21600, 1],
			["MST", 1478419200, -25200, 0],
			["MDT", 1489309200, -21600, 1],
			["MST", 1509868800, -25200, 0],
			["MDT", 1520758800, -21600, 1],
			["MST", 1541318400, -25200, 0],
			["MDT", 1552208400, -21600, 1],
			["MST", 1572768000, -25200, 0],
			["MDT", 1583658000, -21600, 1],
			["MST", 1604217600, -25200, 0],
			["MDT", 1615712400, -21600, 1],
			["MST", 1636272000, -25200, 0],
			["MDT", 1647162000, -21600, 1],
			["MST", 1667721600, -25200, 0],
		],
		"America/Campo_Grande": [
			["-04", 1330225200, -14400, 0],
			["-03", 1350792000, -10800, 1],
			["-04", 1361070000, -14400, 0],
			["-03", 1382241600, -10800, 1],
			["-04", 1392519600, -14400, 0],
			["-03", 1413691200, -10800, 1],
			["-04", 1424574000, -14400, 0],
			["-03", 1445140800, -10800, 1],
			["-04", 1456023600, -14400, 0],
			["-03", 1476590400, -10800, 1],
			["-04", 1487473200, -14400, 0],
			["-03", 1508040000, -10800, 1],
			["-04", 1518922800, -14400, 0],
			["-03", 1541304000, -10800, 1],
			["-04", 1550372400, -14400, 0],
			["-03", 1572753600, -10800, 1],
			["-04", 1581822000, -14400, 0],
			["-03", 1604203200, -10800, 1],
			["-04", 1613876400, -14400, 0],
			["-03", 1636257600, -10800, 1],
			["-04", 1645326000, -14400, 0],
			["-03", 1667707200, -10800, 1],
		],
		"America/Cancun": [
			["CDT", 1333267200, -18000, 1],
			["CST", 1351407600, -21600, 0],
			["CDT", 1365321600, -18000, 1],
			["CST", 1382857200, -21600, 0],
			["CDT", 1396771200, -18000, 1],
			["CST", 1414306800, -21600, 0],
			["EST", 1422777600, -18000, 0],
		],
		"America/Caracas": [
			["-04", 1462086000, -14400, 0],
		],
		"America/Cayenne": [
			["-04", -4260211200, -14400, 0],
		],
		"America/Cayman": [
			["CMT", -4260211200, -19176, 0],
		],
		"America/Chicago": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Chihuahua": [
			["MDT", 1333270800, -21600, 1],
			["MST", 1351411200, -25200, 0],
			["MDT", 1365325200, -21600, 1],
			["MST", 1382860800, -25200, 0],
			["MDT", 1396774800, -21600, 1],
			["MST", 1414310400, -25200, 0],
			["MDT", 1428224400, -21600, 1],
			["MST", 1445760000, -25200, 0],
			["MDT", 1459674000, -21600, 1],
			["MST", 1477814400, -25200, 0],
			["MDT", 1491123600, -21600, 1],
			["MST", 1509264000, -25200, 0],
			["MDT", 1522573200, -21600, 1],
			["MST", 1540713600, -25200, 0],
			["MDT", 1554627600, -21600, 1],
			["MST", 1572163200, -25200, 0],
			["MDT", 1586077200, -21600, 1],
			["MST", 1603612800, -25200, 0],
			["MDT", 1617526800, -21600, 1],
			["MST", 1635667200, -25200, 0],
			["MDT", 1648976400, -21600, 1],
			["MST", 1667116800, -25200, 0],
		],
		"America/Costa_Rica": [
			["SJMT", -4260211200, -20173, 0],
		],
		"America/Creston": [
			["MST", -4260211200, -25200, 0],
		],
		"America/Cuiaba": [
			["-04", 1330225200, -14400, 0],
			["-03", 1350792000, -10800, 1],
			["-04", 1361070000, -14400, 0],
			["-03", 1382241600, -10800, 1],
			["-04", 1392519600, -14400, 0],
			["-03", 1413691200, -10800, 1],
			["-04", 1424574000, -14400, 0],
			["-03", 1445140800, -10800, 1],
			["-04", 1456023600, -14400, 0],
			["-03", 1476590400, -10800, 1],
			["-04", 1487473200, -14400, 0],
			["-03", 1508040000, -10800, 1],
			["-04", 1518922800, -14400, 0],
			["-03", 1541304000, -10800, 1],
			["-04", 1550372400, -14400, 0],
			["-03", 1572753600, -10800, 1],
			["-04", 1581822000, -14400, 0],
			["-03", 1604203200, -10800, 1],
			["-04", 1613876400, -14400, 0],
			["-03", 1636257600, -10800, 1],
			["-04", 1645326000, -14400, 0],
			["-03", 1667707200, -10800, 1],
		],
		"America/Curacao": [
			["-0430", -4260211200, -16200, 0],
		],
		"America/Danmarkshavn": [
			["-03", -4260211200, -10800, 0],
		],
		"America/Dawson": [
			["PDT", 1331460000, -25200, 1],
			["PST", 1352019600, -28800, 0],
			["PDT", 1362909600, -25200, 1],
			["PST", 1383469200, -28800, 0],
			["PDT", 1394359200, -25200, 1],
			["PST", 1414918800, -28800, 0],
			["PDT", 1425808800, -25200, 1],
			["PST", 1446368400, -28800, 0],
			["PDT", 1457863200, -25200, 1],
			["PST", 1478422800, -28800, 0],
			["PDT", 1489312800, -25200, 1],
			["PST", 1509872400, -28800, 0],
			["PDT", 1520762400, -25200, 1],
			["PST", 1541322000, -28800, 0],
			["PDT", 1552212000, -25200, 1],
			["PST", 1572771600, -28800, 0],
			["PDT", 1583661600, -25200, 1],
			["PST", 1604221200, -28800, 0],
			["PDT", 1615716000, -25200, 1],
			["PST", 1636275600, -28800, 0],
			["PDT", 1647165600, -25200, 1],
			["PST", 1667725200, -28800, 0],
		],
		"America/Dawson_Creek": [
			["PST", -4260211200, -28800, 0],
		],
		"America/Denver": [
			["MDT", 1331456400, -21600, 1],
			["MST", 1352016000, -25200, 0],
			["MDT", 1362906000, -21600, 1],
			["MST", 1383465600, -25200, 0],
			["MDT", 1394355600, -21600, 1],
			["MST", 1414915200, -25200, 0],
			["MDT", 1425805200, -21600, 1],
			["MST", 1446364800, -25200, 0],
			["MDT", 1457859600, -21600, 1],
			["MST", 1478419200, -25200, 0],
			["MDT", 1489309200, -21600, 1],
			["MST", 1509868800, -25200, 0],
			["MDT", 1520758800, -21600, 1],
			["MST", 1541318400, -25200, 0],
			["MDT", 1552208400, -21600, 1],
			["MST", 1572768000, -25200, 0],
			["MDT", 1583658000, -21600, 1],
			["MST", 1604217600, -25200, 0],
			["MDT", 1615712400, -21600, 1],
			["MST", 1636272000, -25200, 0],
			["MDT", 1647162000, -21600, 1],
			["MST", 1667721600, -25200, 0],
		],
		"America/Detroit": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Dominica": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Edmonton": [
			["MDT", 1331456400, -21600, 1],
			["MST", 1352016000, -25200, 0],
			["MDT", 1362906000, -21600, 1],
			["MST", 1383465600, -25200, 0],
			["MDT", 1394355600, -21600, 1],
			["MST", 1414915200, -25200, 0],
			["MDT", 1425805200, -21600, 1],
			["MST", 1446364800, -25200, 0],
			["MDT", 1457859600, -21600, 1],
			["MST", 1478419200, -25200, 0],
			["MDT", 1489309200, -21600, 1],
			["MST", 1509868800, -25200, 0],
			["MDT", 1520758800, -21600, 1],
			["MST", 1541318400, -25200, 0],
			["MDT", 1552208400, -21600, 1],
			["MST", 1572768000, -25200, 0],
			["MDT", 1583658000, -21600, 1],
			["MST", 1604217600, -25200, 0],
			["MDT", 1615712400, -21600, 1],
			["MST", 1636272000, -25200, 0],
			["MDT", 1647162000, -21600, 1],
			["MST", 1667721600, -25200, 0],
		],
		"America/Eirunepe": [
			["-05", 1384056000, -18000, 0],
		],
		"America/El_Salvador": [
			["CST", -4260211200, -21600, 0],
		],
		"America/Fort_Nelson": [
			["PDT", 1331460000, -25200, 1],
			["PST", 1352019600, -28800, 0],
			["PDT", 1362909600, -25200, 1],
			["PST", 1383469200, -28800, 0],
			["PDT", 1394359200, -25200, 1],
			["PST", 1414918800, -28800, 0],
			["MST", 1425808800, -25200, 0],
		],
		"America/Fortaleza": [
			["-03", -4260211200, -10800, 0],
		],
		"America/Glace_Bay": [
			["ADT", 1331445600, -10800, 1],
			["AST", 1352005200, -14400, 0],
			["ADT", 1362895200, -10800, 1],
			["AST", 1383454800, -14400, 0],
			["ADT", 1394344800, -10800, 1],
			["AST", 1414904400, -14400, 0],
			["ADT", 1425794400, -10800, 1],
			["AST", 1446354000, -14400, 0],
			["ADT", 1457848800, -10800, 1],
			["AST", 1478408400, -14400, 0],
			["ADT", 1489298400, -10800, 1],
			["AST", 1509858000, -14400, 0],
			["ADT", 1520748000, -10800, 1],
			["AST", 1541307600, -14400, 0],
			["ADT", 1552197600, -10800, 1],
			["AST", 1572757200, -14400, 0],
			["ADT", 1583647200, -10800, 1],
			["AST", 1604206800, -14400, 0],
			["ADT", 1615701600, -10800, 1],
			["AST", 1636261200, -14400, 0],
			["ADT", 1647151200, -10800, 1],
			["AST", 1667710800, -14400, 0],
		],
		"America/Godthab": [
			["-02", 1332637200, -7200, 1],
			["-03", 1351386000, -10800, 0],
			["-02", 1364691600, -7200, 1],
			["-03", 1382835600, -10800, 0],
			["-02", 1396141200, -7200, 1],
			["-03", 1414285200, -10800, 0],
			["-02", 1427590800, -7200, 1],
			["-03", 1445734800, -10800, 0],
			["-02", 1459040400, -7200, 1],
			["-03", 1477789200, -10800, 0],
			["-02", 1490490000, -7200, 1],
			["-03", 1509238800, -10800, 0],
			["-02", 1521939600, -7200, 1],
			["-03", 1540688400, -10800, 0],
			["-02", 1553994000, -7200, 1],
			["-03", 1572138000, -10800, 0],
			["-02", 1585443600, -7200, 1],
			["-03", 1603587600, -10800, 0],
			["-02", 1616893200, -7200, 1],
			["-03", 1635642000, -10800, 0],
			["-02", 1648342800, -7200, 1],
			["-03", 1667091600, -10800, 0],
		],
		"America/Goose_Bay": [
			["ADT", 1331445600, -10800, 1],
			["AST", 1352005200, -14400, 0],
			["ADT", 1362895200, -10800, 1],
			["AST", 1383454800, -14400, 0],
			["ADT", 1394344800, -10800, 1],
			["AST", 1414904400, -14400, 0],
			["ADT", 1425794400, -10800, 1],
			["AST", 1446354000, -14400, 0],
			["ADT", 1457848800, -10800, 1],
			["AST", 1478408400, -14400, 0],
			["ADT", 1489298400, -10800, 1],
			["AST", 1509858000, -14400, 0],
			["ADT", 1520748000, -10800, 1],
			["AST", 1541307600, -14400, 0],
			["ADT", 1552197600, -10800, 1],
			["AST", 1572757200, -14400, 0],
			["ADT", 1583647200, -10800, 1],
			["AST", 1604206800, -14400, 0],
			["ADT", 1615701600, -10800, 1],
			["AST", 1636261200, -14400, 0],
			["ADT", 1647151200, -10800, 1],
			["AST", 1667710800, -14400, 0],
		],
		"America/Grand_Turk": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["AST", 1446357600, -14400, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Grenada": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Guadeloupe": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Guatemala": [
			["CST", -4260211200, -21600, 0],
		],
		"America/Guayaquil": [
			["QMT", -4260211200, -18840, 0],
		],
		"America/Guyana": [
			["-0345", -4260211200, -13500, 0],
		],
		"America/Halifax": [
			["ADT", 1331445600, -10800, 1],
			["AST", 1352005200, -14400, 0],
			["ADT", 1362895200, -10800, 1],
			["AST", 1383454800, -14400, 0],
			["ADT", 1394344800, -10800, 1],
			["AST", 1414904400, -14400, 0],
			["ADT", 1425794400, -10800, 1],
			["AST", 1446354000, -14400, 0],
			["ADT", 1457848800, -10800, 1],
			["AST", 1478408400, -14400, 0],
			["ADT", 1489298400, -10800, 1],
			["AST", 1509858000, -14400, 0],
			["ADT", 1520748000, -10800, 1],
			["AST", 1541307600, -14400, 0],
			["ADT", 1552197600, -10800, 1],
			["AST", 1572757200, -14400, 0],
			["ADT", 1583647200, -10800, 1],
			["AST", 1604206800, -14400, 0],
			["ADT", 1615701600, -10800, 1],
			["AST", 1636261200, -14400, 0],
			["ADT", 1647151200, -10800, 1],
			["AST", 1667710800, -14400, 0],
		],
		"America/Havana": [
			["CDT", 1333256400, -14400, 1],
			["CST", 1352005200, -18000, 0],
			["CDT", 1362891600, -14400, 1],
			["CST", 1383454800, -18000, 0],
			["CDT", 1394341200, -14400, 1],
			["CST", 1414904400, -18000, 0],
			["CDT", 1425790800, -14400, 1],
			["CST", 1446354000, -18000, 0],
			["CDT", 1457845200, -14400, 1],
			["CST", 1478408400, -18000, 0],
			["CDT", 1489294800, -14400, 1],
			["CST", 1509858000, -18000, 0],
			["CDT", 1520744400, -14400, 1],
			["CST", 1541307600, -18000, 0],
			["CDT", 1552194000, -14400, 1],
			["CST", 1572757200, -18000, 0],
			["CDT", 1583643600, -14400, 1],
			["CST", 1604206800, -18000, 0],
			["CDT", 1615698000, -14400, 1],
			["CST", 1636261200, -18000, 0],
			["CDT", 1647147600, -14400, 1],
			["CST", 1667710800, -18000, 0],
		],
		"America/Hermosillo": [
			["MST", -4260211200, -25200, 0],
		],
		"America/Indiana/Indianapolis": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Indiana/Knox": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Indiana/Marengo": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Indiana/Petersburg": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Indiana/Tell_City": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Indiana/Vevay": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Indiana/Vincennes": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Indiana/Winamac": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Inuvik": [
			["MDT", 1331456400, -21600, 1],
			["MST", 1352016000, -25200, 0],
			["MDT", 1362906000, -21600, 1],
			["MST", 1383465600, -25200, 0],
			["MDT", 1394355600, -21600, 1],
			["MST", 1414915200, -25200, 0],
			["MDT", 1425805200, -21600, 1],
			["MST", 1446364800, -25200, 0],
			["MDT", 1457859600, -21600, 1],
			["MST", 1478419200, -25200, 0],
			["MDT", 1489309200, -21600, 1],
			["MST", 1509868800, -25200, 0],
			["MDT", 1520758800, -21600, 1],
			["MST", 1541318400, -25200, 0],
			["MDT", 1552208400, -21600, 1],
			["MST", 1572768000, -25200, 0],
			["MDT", 1583658000, -21600, 1],
			["MST", 1604217600, -25200, 0],
			["MDT", 1615712400, -21600, 1],
			["MST", 1636272000, -25200, 0],
			["MDT", 1647162000, -21600, 1],
			["MST", 1667721600, -25200, 0],
		],
		"America/Iqaluit": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Jamaica": [
			["KMT", -4260211200, -18430, 0],
		],
		"America/Juneau": [
			["AKDT", 1331463600, -28800, 1],
			["AKST", 1352023200, -32400, 0],
			["AKDT", 1362913200, -28800, 1],
			["AKST", 1383472800, -32400, 0],
			["AKDT", 1394362800, -28800, 1],
			["AKST", 1414922400, -32400, 0],
			["AKDT", 1425812400, -28800, 1],
			["AKST", 1446372000, -32400, 0],
			["AKDT", 1457866800, -28800, 1],
			["AKST", 1478426400, -32400, 0],
			["AKDT", 1489316400, -28800, 1],
			["AKST", 1509876000, -32400, 0],
			["AKDT", 1520766000, -28800, 1],
			["AKST", 1541325600, -32400, 0],
			["AKDT", 1552215600, -28800, 1],
			["AKST", 1572775200, -32400, 0],
			["AKDT", 1583665200, -28800, 1],
			["AKST", 1604224800, -32400, 0],
			["AKDT", 1615719600, -28800, 1],
			["AKST", 1636279200, -32400, 0],
			["AKDT", 1647169200, -28800, 1],
			["AKST", 1667728800, -32400, 0],
		],
		"America/Kentucky/Louisville": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Kentucky/Monticello": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Kralendijk": [
			["-0430", -4260211200, -16200, 0],
		],
		"America/La_Paz": [
			["CMT", -4260211200, -16356, 0],
		],
		"America/Lima": [
			["-05", -4260211200, -18000, 0],
		],
		"America/Los_Angeles": [
			["PDT", 1331460000, -25200, 1],
			["PST", 1352019600, -28800, 0],
			["PDT", 1362909600, -25200, 1],
			["PST", 1383469200, -28800, 0],
			["PDT", 1394359200, -25200, 1],
			["PST", 1414918800, -28800, 0],
			["PDT", 1425808800, -25200, 1],
			["PST", 1446368400, -28800, 0],
			["PDT", 1457863200, -25200, 1],
			["PST", 1478422800, -28800, 0],
			["PDT", 1489312800, -25200, 1],
			["PST", 1509872400, -28800, 0],
			["PDT", 1520762400, -25200, 1],
			["PST", 1541322000, -28800, 0],
			["PDT", 1552212000, -25200, 1],
			["PST", 1572771600, -28800, 0],
			["PDT", 1583661600, -25200, 1],
			["PST", 1604221200, -28800, 0],
			["PDT", 1615716000, -25200, 1],
			["PST", 1636275600, -28800, 0],
			["PDT", 1647165600, -25200, 1],
			["PST", 1667725200, -28800, 0],
		],
		"America/Lower_Princes": [
			["-0430", -4260211200, -16200, 0],
		],
		"America/Maceio": [
			["-03", -4260211200, -10800, 0],
		],
		"America/Managua": [
			["MMT", -4260211200, -20712, 0],
		],
		"America/Manaus": [
			["-04", -4260211200, -14400, 0],
		],
		"America/Marigot": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Martinique": [
			["FFMT", -4260211200, -14660, 0],
		],
		"America/Matamoros": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Mazatlan": [
			["MDT", 1333270800, -21600, 1],
			["MST", 1351411200, -25200, 0],
			["MDT", 1365325200, -21600, 1],
			["MST", 1382860800, -25200, 0],
			["MDT", 1396774800, -21600, 1],
			["MST", 1414310400, -25200, 0],
			["MDT", 1428224400, -21600, 1],
			["MST", 1445760000, -25200, 0],
			["MDT", 1459674000, -21600, 1],
			["MST", 1477814400, -25200, 0],
			["MDT", 1491123600, -21600, 1],
			["MST", 1509264000, -25200, 0],
			["MDT", 1522573200, -21600, 1],
			["MST", 1540713600, -25200, 0],
			["MDT", 1554627600, -21600, 1],
			["MST", 1572163200, -25200, 0],
			["MDT", 1586077200, -21600, 1],
			["MST", 1603612800, -25200, 0],
			["MDT", 1617526800, -21600, 1],
			["MST", 1635667200, -25200, 0],
			["MDT", 1648976400, -21600, 1],
			["MST", 1667116800, -25200, 0],
		],
		"America/Menominee": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Merida": [
			["CDT", 1333267200, -18000, 1],
			["CST", 1351407600, -21600, 0],
			["CDT", 1365321600, -18000, 1],
			["CST", 1382857200, -21600, 0],
			["CDT", 1396771200, -18000, 1],
			["CST", 1414306800, -21600, 0],
			["CDT", 1428220800, -18000, 1],
			["CST", 1445756400, -21600, 0],
			["CDT", 1459670400, -18000, 1],
			["CST", 1477810800, -21600, 0],
			["CDT", 1491120000, -18000, 1],
			["CST", 1509260400, -21600, 0],
			["CDT", 1522569600, -18000, 1],
			["CST", 1540710000, -21600, 0],
			["CDT", 1554624000, -18000, 1],
			["CST", 1572159600, -21600, 0],
			["CDT", 1586073600, -18000, 1],
			["CST", 1603609200, -21600, 0],
			["CDT", 1617523200, -18000, 1],
			["CST", 1635663600, -21600, 0],
			["CDT", 1648972800, -18000, 1],
			["CST", 1667113200, -21600, 0],
		],
		"America/Metlakatla": [
			["AKST", 1446372000, -32400, 0],
			["AKDT", 1457866800, -28800, 1],
			["AKST", 1478426400, -32400, 0],
			["AKDT", 1489316400, -28800, 1],
			["AKST", 1509876000, -32400, 0],
			["AKDT", 1520766000, -28800, 1],
			["AKST", 1541325600, -32400, 0],
			["AKDT", 1552215600, -28800, 1],
			["AKST", 1572775200, -32400, 0],
			["AKDT", 1583665200, -28800, 1],
			["AKST", 1604224800, -32400, 0],
			["AKDT", 1615719600, -28800, 1],
			["AKST", 1636279200, -32400, 0],
			["AKDT", 1647169200, -28800, 1],
			["AKST", 1667728800, -32400, 0],
		],
		"America/Mexico_City": [
			["CDT", 1333267200, -18000, 1],
			["CST", 1351407600, -21600, 0],
			["CDT", 1365321600, -18000, 1],
			["CST", 1382857200, -21600, 0],
			["CDT", 1396771200, -18000, 1],
			["CST", 1414306800, -21600, 0],
			["CDT", 1428220800, -18000, 1],
			["CST", 1445756400, -21600, 0],
			["CDT", 1459670400, -18000, 1],
			["CST", 1477810800, -21600, 0],
			["CDT", 1491120000, -18000, 1],
			["CST", 1509260400, -21600, 0],
			["CDT", 1522569600, -18000, 1],
			["CST", 1540710000, -21600, 0],
			["CDT", 1554624000, -18000, 1],
			["CST", 1572159600, -21600, 0],
			["CDT", 1586073600, -18000, 1],
			["CST", 1603609200, -21600, 0],
			["CDT", 1617523200, -18000, 1],
			["CST", 1635663600, -21600, 0],
			["CDT", 1648972800, -18000, 1],
			["CST", 1667113200, -21600, 0],
		],
		"America/Miquelon": [
			["-02", 1331442000, -7200, 1],
			["-03", 1352001600, -10800, 0],
			["-02", 1362891600, -7200, 1],
			["-03", 1383451200, -10800, 0],
			["-02", 1394341200, -7200, 1],
			["-03", 1414900800, -10800, 0],
			["-02", 1425790800, -7200, 1],
			["-03", 1446350400, -10800, 0],
			["-02", 1457845200, -7200, 1],
			["-03", 1478404800, -10800, 0],
			["-02", 1489294800, -7200, 1],
			["-03", 1509854400, -10800, 0],
			["-02", 1520744400, -7200, 1],
			["-03", 1541304000, -10800, 0],
			["-02", 1552194000, -7200, 1],
			["-03", 1572753600, -10800, 0],
			["-02", 1583643600, -7200, 1],
			["-03", 1604203200, -10800, 0],
			["-02", 1615698000, -7200, 1],
			["-03", 1636257600, -10800, 0],
			["-02", 1647147600, -7200, 1],
			["-03", 1667707200, -10800, 0],
		],
		"America/Moncton": [
			["ADT", 1331445600, -10800, 1],
			["AST", 1352005200, -14400, 0],
			["ADT", 1362895200, -10800, 1],
			["AST", 1383454800, -14400, 0],
			["ADT", 1394344800, -10800, 1],
			["AST", 1414904400, -14400, 0],
			["ADT", 1425794400, -10800, 1],
			["AST", 1446354000, -14400, 0],
			["ADT", 1457848800, -10800, 1],
			["AST", 1478408400, -14400, 0],
			["ADT", 1489298400, -10800, 1],
			["AST", 1509858000, -14400, 0],
			["ADT", 1520748000, -10800, 1],
			["AST", 1541307600, -14400, 0],
			["ADT", 1552197600, -10800, 1],
			["AST", 1572757200, -14400, 0],
			["ADT", 1583647200, -10800, 1],
			["AST", 1604206800, -14400, 0],
			["ADT", 1615701600, -10800, 1],
			["AST", 1636261200, -14400, 0],
			["ADT", 1647151200, -10800, 1],
			["AST", 1667710800, -14400, 0],
		],
		"America/Monterrey": [
			["CDT", 1333267200, -18000, 1],
			["CST", 1351407600, -21600, 0],
			["CDT", 1365321600, -18000, 1],
			["CST", 1382857200, -21600, 0],
			["CDT", 1396771200, -18000, 1],
			["CST", 1414306800, -21600, 0],
			["CDT", 1428220800, -18000, 1],
			["CST", 1445756400, -21600, 0],
			["CDT", 1459670400, -18000, 1],
			["CST", 1477810800, -21600, 0],
			["CDT", 1491120000, -18000, 1],
			["CST", 1509260400, -21600, 0],
			["CDT", 1522569600, -18000, 1],
			["CST", 1540710000, -21600, 0],
			["CDT", 1554624000, -18000, 1],
			["CST", 1572159600, -21600, 0],
			["CDT", 1586073600, -18000, 1],
			["CST", 1603609200, -21600, 0],
			["CDT", 1617523200, -18000, 1],
			["CST", 1635663600, -21600, 0],
			["CDT", 1648972800, -18000, 1],
			["CST", 1667113200, -21600, 0],
		],
		"America/Montevideo": [
			["-03", 1331438400, -10800, 0],
			["-02", 1349586000, -7200, 1],
			["-03", 1362888000, -10800, 0],
			["-02", 1381035600, -7200, 1],
			["-03", 1394337600, -10800, 0],
			["-02", 1412485200, -7200, 1],
			["-03", 1425787200, -10800, 0],
		],
		"America/Montserrat": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Nassau": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/New_York": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Nipigon": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Nome": [
			["AKDT", 1331463600, -28800, 1],
			["AKST", 1352023200, -32400, 0],
			["AKDT", 1362913200, -28800, 1],
			["AKST", 1383472800, -32400, 0],
			["AKDT", 1394362800, -28800, 1],
			["AKST", 1414922400, -32400, 0],
			["AKDT", 1425812400, -28800, 1],
			["AKST", 1446372000, -32400, 0],
			["AKDT", 1457866800, -28800, 1],
			["AKST", 1478426400, -32400, 0],
			["AKDT", 1489316400, -28800, 1],
			["AKST", 1509876000, -32400, 0],
			["AKDT", 1520766000, -28800, 1],
			["AKST", 1541325600, -32400, 0],
			["AKDT", 1552215600, -28800, 1],
			["AKST", 1572775200, -32400, 0],
			["AKDT", 1583665200, -28800, 1],
			["AKST", 1604224800, -32400, 0],
			["AKDT", 1615719600, -28800, 1],
			["AKST", 1636279200, -32400, 0],
			["AKDT", 1647169200, -28800, 1],
			["AKST", 1667728800, -32400, 0],
		],
		"America/Noronha": [
			["-02", -4260211200, -7200, 0],
		],
		"America/North_Dakota/Beulah": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/North_Dakota/Center": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/North_Dakota/New_Salem": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Ojinaga": [
			["MDT", 1331456400, -21600, 1],
			["MST", 1352016000, -25200, 0],
			["MDT", 1362906000, -21600, 1],
			["MST", 1383465600, -25200, 0],
			["MDT", 1394355600, -21600, 1],
			["MST", 1414915200, -25200, 0],
			["MDT", 1425805200, -21600, 1],
			["MST", 1446364800, -25200, 0],
			["MDT", 1457859600, -21600, 1],
			["MST", 1478419200, -25200, 0],
			["MDT", 1489309200, -21600, 1],
			["MST", 1509868800, -25200, 0],
			["MDT", 1520758800, -21600, 1],
			["MST", 1541318400, -25200, 0],
			["MDT", 1552208400, -21600, 1],
			["MST", 1572768000, -25200, 0],
			["MDT", 1583658000, -21600, 1],
			["MST", 1604217600, -25200, 0],
			["MDT", 1615712400, -21600, 1],
			["MST", 1636272000, -25200, 0],
			["MDT", 1647162000, -21600, 1],
			["MST", 1667721600, -25200, 0],
		],
		"America/Panama": [
			["CMT", -4260211200, -19176, 0],
		],
		"America/Pangnirtung": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Paramaribo": [
			["PMT", -4260211200, -13252, 0],
		],
		"America/Phoenix": [
			["MST", -4260211200, -25200, 0],
		],
		"America/Port-au-Prince": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Port_of_Spain": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Porto_Velho": [
			["-04", -4260211200, -14400, 0],
		],
		"America/Puerto_Rico": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Punta_Arenas": [
			["-04", 1335668400, -14400, 0],
			["-03", 1346558400, -10800, 1],
			["-04", 1367118000, -14400, 0],
			["-03", 1378612800, -10800, 1],
			["-04", 1398567600, -14400, 0],
			["-03", 1410062400, -10800, 1],
			["-04", 1463281200, -14400, 0],
			["-03", 1471147200, -10800, 1],
		],
		"America/Rainy_River": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Rankin_Inlet": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Recife": [
			["-03", -4260211200, -10800, 0],
		],
		"America/Regina": [
			["MST", -4260211200, -25200, 0],
		],
		"America/Resolute": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Rio_Branco": [
			["-05", 1384056000, -18000, 0],
		],
		"America/Santarem": [
			["-04", -4260211200, -14400, 0],
		],
		"America/Santiago": [
			["-04", 1335668400, -14400, 0],
			["-03", 1346558400, -10800, 1],
			["-04", 1367118000, -14400, 0],
			["-03", 1378612800, -10800, 1],
			["-04", 1398567600, -14400, 0],
			["-03", 1410062400, -10800, 1],
			["-04", 1463281200, -14400, 0],
			["-03", 1471147200, -10800, 1],
			["-04", 1494730800, -14400, 0],
			["-03", 1502596800, -10800, 1],
			["-04", 1526180400, -14400, 0],
			["-03", 1534046400, -10800, 1],
			["-04", 1557630000, -14400, 0],
			["-03", 1565496000, -10800, 1],
			["-04", 1589079600, -14400, 0],
			["-03", 1596945600, -10800, 1],
			["-04", 1620529200, -14400, 0],
			["-03", 1629000000, -10800, 1],
			["-04", 1652583600, -14400, 0],
			["-03", 1660449600, -10800, 1],
		],
		"America/Santo_Domingo": [
			["SDMT", -4260211200, -16800, 0],
		],
		"America/Sao_Paulo": [
			["-03", 1330221600, -10800, 0],
			["-02", 1350788400, -7200, 1],
			["-03", 1361066400, -10800, 0],
			["-02", 1382238000, -7200, 1],
			["-03", 1392516000, -10800, 0],
			["-02", 1413687600, -7200, 1],
			["-03", 1424570400, -10800, 0],
			["-02", 1445137200, -7200, 1],
			["-03", 1456020000, -10800, 0],
			["-02", 1476586800, -7200, 1],
			["-03", 1487469600, -10800, 0],
			["-02", 1508036400, -7200, 1],
			["-03", 1518919200, -10800, 0],
			["-02", 1541300400, -7200, 1],
			["-03", 1550368800, -10800, 0],
			["-02", 1572750000, -7200, 1],
			["-03", 1581818400, -10800, 0],
			["-02", 1604199600, -7200, 1],
			["-03", 1613872800, -10800, 0],
			["-02", 1636254000, -7200, 1],
			["-03", 1645322400, -10800, 0],
			["-02", 1667703600, -7200, 1],
		],
		"America/Scoresbysund": [
			["+00", 1332637200, 0, 1],
			["-01", 1351386000, -3600, 0],
			["+00", 1364691600, 0, 1],
			["-01", 1382835600, -3600, 0],
			["+00", 1396141200, 0, 1],
			["-01", 1414285200, -3600, 0],
			["+00", 1427590800, 0, 1],
			["-01", 1445734800, -3600, 0],
			["+00", 1459040400, 0, 1],
			["-01", 1477789200, -3600, 0],
			["+00", 1490490000, 0, 1],
			["-01", 1509238800, -3600, 0],
			["+00", 1521939600, 0, 1],
			["-01", 1540688400, -3600, 0],
			["+00", 1553994000, 0, 1],
			["-01", 1572138000, -3600, 0],
			["+00", 1585443600, 0, 1],
			["-01", 1603587600, -3600, 0],
			["+00", 1616893200, 0, 1],
			["-01", 1635642000, -3600, 0],
			["+00", 1648342800, 0, 1],
			["-01", 1667091600, -3600, 0],
		],
		"America/Sitka": [
			["AKDT", 1331463600, -28800, 1],
			["AKST", 1352023200, -32400, 0],
			["AKDT", 1362913200, -28800, 1],
			["AKST", 1383472800, -32400, 0],
			["AKDT", 1394362800, -28800, 1],
			["AKST", 1414922400, -32400, 0],
			["AKDT", 1425812400, -28800, 1],
			["AKST", 1446372000, -32400, 0],
			["AKDT", 1457866800, -28800, 1],
			["AKST", 1478426400, -32400, 0],
			["AKDT", 1489316400, -28800, 1],
			["AKST", 1509876000, -32400, 0],
			["AKDT", 1520766000, -28800, 1],
			["AKST", 1541325600, -32400, 0],
			["AKDT", 1552215600, -28800, 1],
			["AKST", 1572775200, -32400, 0],
			["AKDT", 1583665200, -28800, 1],
			["AKST", 1604224800, -32400, 0],
			["AKDT", 1615719600, -28800, 1],
			["AKST", 1636279200, -32400, 0],
			["AKDT", 1647169200, -28800, 1],
			["AKST", 1667728800, -32400, 0],
		],
		"America/St_Barthelemy": [
			["AST", -4260211200, -14400, 0],
		],
		"America/St_Johns": [
			["NDT", 1331443800, -9000, 1],
			["NST", 1352003400, -12600, 0],
			["NDT", 1362893400, -9000, 1],
			["NST", 1383453000, -12600, 0],
			["NDT", 1394343000, -9000, 1],
			["NST", 1414902600, -12600, 0],
			["NDT", 1425792600, -9000, 1],
			["NST", 1446352200, -12600, 0],
			["NDT", 1457847000, -9000, 1],
			["NST", 1478406600, -12600, 0],
			["NDT", 1489296600, -9000, 1],
			["NST", 1509856200, -12600, 0],
			["NDT", 1520746200, -9000, 1],
			["NST", 1541305800, -12600, 0],
			["NDT", 1552195800, -9000, 1],
			["NST", 1572755400, -12600, 0],
			["NDT", 1583645400, -9000, 1],
			["NST", 1604205000, -12600, 0],
			["NDT", 1615699800, -9000, 1],
			["NST", 1636259400, -12600, 0],
			["NDT", 1647149400, -9000, 1],
			["NST", 1667709000, -12600, 0],
		],
		"America/St_Kitts": [
			["AST", -4260211200, -14400, 0],
		],
		"America/St_Lucia": [
			["AST", -4260211200, -14400, 0],
		],
		"America/St_Thomas": [
			["AST", -4260211200, -14400, 0],
		],
		"America/St_Vincent": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Swift_Current": [
			["MST", -4260211200, -25200, 0],
		],
		"America/Tegucigalpa": [
			["CST", -4260211200, -21600, 0],
		],
		"America/Thule": [
			["ADT", 1331445600, -10800, 1],
			["AST", 1352005200, -14400, 0],
			["ADT", 1362895200, -10800, 1],
			["AST", 1383454800, -14400, 0],
			["ADT", 1394344800, -10800, 1],
			["AST", 1414904400, -14400, 0],
			["ADT", 1425794400, -10800, 1],
			["AST", 1446354000, -14400, 0],
			["ADT", 1457848800, -10800, 1],
			["AST", 1478408400, -14400, 0],
			["ADT", 1489298400, -10800, 1],
			["AST", 1509858000, -14400, 0],
			["ADT", 1520748000, -10800, 1],
			["AST", 1541307600, -14400, 0],
			["ADT", 1552197600, -10800, 1],
			["AST", 1572757200, -14400, 0],
			["ADT", 1583647200, -10800, 1],
			["AST", 1604206800, -14400, 0],
			["ADT", 1615701600, -10800, 1],
			["AST", 1636261200, -14400, 0],
			["ADT", 1647151200, -10800, 1],
			["AST", 1667710800, -14400, 0],
		],
		"America/Thunder_Bay": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Tijuana": [
			["PDT", 1331460000, -25200, 1],
			["PST", 1352019600, -28800, 0],
			["PDT", 1362909600, -25200, 1],
			["PST", 1383469200, -28800, 0],
			["PDT", 1394359200, -25200, 1],
			["PST", 1414918800, -28800, 0],
			["PDT", 1425808800, -25200, 1],
			["PST", 1446368400, -28800, 0],
			["PDT", 1457863200, -25200, 1],
			["PST", 1478422800, -28800, 0],
			["PDT", 1489312800, -25200, 1],
			["PST", 1509872400, -28800, 0],
			["PDT", 1520762400, -25200, 1],
			["PST", 1541322000, -28800, 0],
			["PDT", 1552212000, -25200, 1],
			["PST", 1572771600, -28800, 0],
			["PDT", 1583661600, -25200, 1],
			["PST", 1604221200, -28800, 0],
			["PDT", 1615716000, -25200, 1],
			["PST", 1636275600, -28800, 0],
			["PDT", 1647165600, -25200, 1],
			["PST", 1667725200, -28800, 0],
		],
		"America/Toronto": [
			["EDT", 1331449200, -14400, 1],
			["EST", 1352008800, -18000, 0],
			["EDT", 1362898800, -14400, 1],
			["EST", 1383458400, -18000, 0],
			["EDT", 1394348400, -14400, 1],
			["EST", 1414908000, -18000, 0],
			["EDT", 1425798000, -14400, 1],
			["EST", 1446357600, -18000, 0],
			["EDT", 1457852400, -14400, 1],
			["EST", 1478412000, -18000, 0],
			["EDT", 1489302000, -14400, 1],
			["EST", 1509861600, -18000, 0],
			["EDT", 1520751600, -14400, 1],
			["EST", 1541311200, -18000, 0],
			["EDT", 1552201200, -14400, 1],
			["EST", 1572760800, -18000, 0],
			["EDT", 1583650800, -14400, 1],
			["EST", 1604210400, -18000, 0],
			["EDT", 1615705200, -14400, 1],
			["EST", 1636264800, -18000, 0],
			["EDT", 1647154800, -14400, 1],
			["EST", 1667714400, -18000, 0],
		],
		"America/Tortola": [
			["AST", -4260211200, -14400, 0],
		],
		"America/Vancouver": [
			["PDT", 1331460000, -25200, 1],
			["PST", 1352019600, -28800, 0],
			["PDT", 1362909600, -25200, 1],
			["PST", 1383469200, -28800, 0],
			["PDT", 1394359200, -25200, 1],
			["PST", 1414918800, -28800, 0],
			["PDT", 1425808800, -25200, 1],
			["PST", 1446368400, -28800, 0],
			["PDT", 1457863200, -25200, 1],
			["PST", 1478422800, -28800, 0],
			["PDT", 1489312800, -25200, 1],
			["PST", 1509872400, -28800, 0],
			["PDT", 1520762400, -25200, 1],
			["PST", 1541322000, -28800, 0],
			["PDT", 1552212000, -25200, 1],
			["PST", 1572771600, -28800, 0],
			["PDT", 1583661600, -25200, 1],
			["PST", 1604221200, -28800, 0],
			["PDT", 1615716000, -25200, 1],
			["PST", 1636275600, -28800, 0],
			["PDT", 1647165600, -25200, 1],
			["PST", 1667725200, -28800, 0],
		],
		"America/Whitehorse": [
			["PDT", 1331460000, -25200, 1],
			["PST", 1352019600, -28800, 0],
			["PDT", 1362909600, -25200, 1],
			["PST", 1383469200, -28800, 0],
			["PDT", 1394359200, -25200, 1],
			["PST", 1414918800, -28800, 0],
			["PDT", 1425808800, -25200, 1],
			["PST", 1446368400, -28800, 0],
			["PDT", 1457863200, -25200, 1],
			["PST", 1478422800, -28800, 0],
			["PDT", 1489312800, -25200, 1],
			["PST", 1509872400, -28800, 0],
			["PDT", 1520762400, -25200, 1],
			["PST", 1541322000, -28800, 0],
			["PDT", 1552212000, -25200, 1],
			["PST", 1572771600, -28800, 0],
			["PDT", 1583661600, -25200, 1],
			["PST", 1604221200, -28800, 0],
			["PDT", 1615716000, -25200, 1],
			["PST", 1636275600, -28800, 0],
			["PDT", 1647165600, -25200, 1],
			["PST", 1667725200, -28800, 0],
		],
		"America/Winnipeg": [
			["CDT", 1331452800, -18000, 1],
			["CST", 1352012400, -21600, 0],
			["CDT", 1362902400, -18000, 1],
			["CST", 1383462000, -21600, 0],
			["CDT", 1394352000, -18000, 1],
			["CST", 1414911600, -21600, 0],
			["CDT", 1425801600, -18000, 1],
			["CST", 1446361200, -21600, 0],
			["CDT", 1457856000, -18000, 1],
			["CST", 1478415600, -21600, 0],
			["CDT", 1489305600, -18000, 1],
			["CST", 1509865200, -21600, 0],
			["CDT", 1520755200, -18000, 1],
			["CST", 1541314800, -21600, 0],
			["CDT", 1552204800, -18000, 1],
			["CST", 1572764400, -21600, 0],
			["CDT", 1583654400, -18000, 1],
			["CST", 1604214000, -21600, 0],
			["CDT", 1615708800, -18000, 1],
			["CST", 1636268400, -21600, 0],
			["CDT", 1647158400, -18000, 1],
			["CST", 1667718000, -21600, 0],
		],
		"America/Yakutat": [
			["AKDT", 1331463600, -28800, 1],
			["AKST", 1352023200, -32400, 0],
			["AKDT", 1362913200, -28800, 1],
			["AKST", 1383472800, -32400, 0],
			["AKDT", 1394362800, -28800, 1],
			["AKST", 1414922400, -32400, 0],
			["AKDT", 1425812400, -28800, 1],
			["AKST", 1446372000, -32400, 0],
			["AKDT", 1457866800, -28800, 1],
			["AKST", 1478426400, -32400, 0],
			["AKDT", 1489316400, -28800, 1],
			["AKST", 1509876000, -32400, 0],
			["AKDT", 1520766000, -28800, 1],
			["AKST", 1541325600, -32400, 0],
			["AKDT", 1552215600, -28800, 1],
			["AKST", 1572775200, -32400, 0],
			["AKDT", 1583665200, -28800, 1],
			["AKST", 1604224800, -32400, 0],
			["AKDT", 1615719600, -28800, 1],
			["AKST", 1636279200, -32400, 0],
			["AKDT", 1647169200, -28800, 1],
			["AKST", 1667728800, -32400, 0],
		],
		"America/Yellowknife": [
			["MDT", 1331456400, -21600, 1],
			["MST", 1352016000, -25200, 0],
			["MDT", 1362906000, -21600, 1],
			["MST", 1383465600, -25200, 0],
			["MDT", 1394355600, -21600, 1],
			["MST", 1414915200, -25200, 0],
			["MDT", 1425805200, -21600, 1],
			["MST", 1446364800, -25200, 0],
			["MDT", 1457859600, -21600, 1],
			["MST", 1478419200, -25200, 0],
			["MDT", 1489309200, -21600, 1],
			["MST", 1509868800, -25200, 0],
			["MDT", 1520758800, -21600, 1],
			["MST", 1541318400, -25200, 0],
			["MDT", 1552208400, -21600, 1],
			["MST", 1572768000, -25200, 0],
			["MDT", 1583658000, -21600, 1],
			["MST", 1604217600, -25200, 0],
			["MDT", 1615712400, -21600, 1],
			["MST", 1636272000, -25200, 0],
			["MDT", 1647162000, -21600, 1],
			["MST", 1667721600, -25200, 0],
		],
		"Antarctica/Casey": [
			["+08", 1329843600, 28800, 0],
			["+11", 1477065600, 39600, 0],
			["+08", 1520701200, 28800, 0],
		],
		"Antarctica/Davis": [
			["+07", 1329854400, 25200, 0],
		],
		"Antarctica/DumontDUrville": [
			["+10", -4260211200, 36000, 0],
		],
		"Antarctica/Macquarie": [
			["AEST", -4260211200, 36000, 0],
		],
		"Antarctica/Mawson": [
			["+06", -4260211200, 21600, 0],
		],
		"Antarctica/McMurdo": [
			["NZST", 1333202400, 43200, 0],
			["NZDT", 1348927200, 46800, 1],
			["NZST", 1365256800, 43200, 0],
			["NZDT", 1380376800, 46800, 1],
			["NZST", 1396706400, 43200, 0],
			["NZDT", 1411826400, 46800, 1],
			["NZST", 1428156000, 43200, 0],
			["NZDT", 1443276000, 46800, 1],
			["NZST", 1459605600, 43200, 0],
			["NZDT", 1474725600, 46800, 1],
			["NZST", 1491055200, 43200, 0],
			["NZDT", 1506175200, 46800, 1],
			["NZST", 1522504800, 43200, 0],
			["NZDT", 1538229600, 46800, 1],
			["NZST", 1554559200, 43200, 0],
			["NZDT", 1569679200, 46800, 1],
			["NZST", 1586008800, 43200, 0],
			["NZDT", 1601128800, 46800, 1],
			["NZST", 1617458400, 43200, 0],
			["NZDT", 1632578400, 46800, 1],
			["NZST", 1648908000, 43200, 0],
			["NZDT", 1664028000, 46800, 1],
		],
		"Antarctica/Palmer": [
			["-04", 1335668400, -14400, 0],
			["-03", 1346558400, -10800, 1],
			["-04", 1367118000, -14400, 0],
			["-03", 1378612800, -10800, 1],
			["-04", 1398567600, -14400, 0],
			["-03", 1410062400, -10800, 1],
			["-04", 1463281200, -14400, 0],
			["-03", 1471147200, -10800, 1],
		],
		"Antarctica/Rothera": [
			["-03", -4260211200, -10800, 0],
		],
		"Antarctica/Syowa": [
			["+03", -4260211200, 10800, 0],
		],
		"Antarctica/Troll": [
			["+02", 1332637200, 7200, 1],
			["+00", 1351386000, 0, 0],
			["+02", 1364691600, 7200, 1],
			["+00", 1382835600, 0, 0],
			["+02", 1396141200, 7200, 1],
			["+00", 1414285200, 0, 0],
			["+02", 1427590800, 7200, 1],
			["+00", 1445734800, 0, 0],
			["+02", 1459040400, 7200, 1],
			["+00", 1477789200, 0, 0],
			["+02", 1490490000, 7200, 1],
			["+00", 1509238800, 0, 0],
			["+02", 1521939600, 7200, 1],
			["+00", 1540688400, 0, 0],
			["+02", 1553994000, 7200, 1],
			["+00", 1572138000, 0, 0],
			["+02", 1585443600, 7200, 1],
			["+00", 1603587600, 0, 0],
			["+02", 1616893200, 7200, 1],
			["+00", 1635642000, 0, 0],
			["+02", 1648342800, 7200, 1],
			["+00", 1667091600, 0, 0],
		],
		"Antarctica/Vostok": [
			["+06", -4260211200, 21600, 0],
		],
		"Arctic/Longyearbyen": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Asia/Aden": [
			["+03", -4260211200, 10800, 0],
		],
		"Asia/Almaty": [
			["+05", -4260211200, 18000, 0],
		],
		"Asia/Amman": [
			["EEST", 1333058400, 10800, 1],
			["EET", 1387486800, 7200, 0],
			["EEST", 1395957600, 10800, 1],
			["EET", 1414706400, 7200, 0],
			["EEST", 1427407200, 10800, 1],
			["EET", 1446156000, 7200, 0],
			["EEST", 1459461600, 10800, 1],
			["EET", 1477605600, 7200, 0],
			["EEST", 1490911200, 10800, 1],
			["EET", 1509055200, 7200, 0],
			["EEST", 1522360800, 10800, 1],
			["EET", 1540504800, 7200, 0],
			["EEST", 1553810400, 10800, 1],
			["EET", 1571954400, 7200, 0],
			["EEST", 1585260000, 10800, 1],
			["EET", 1604008800, 7200, 0],
			["EEST", 1616709600, 10800, 1],
			["EET", 1635458400, 7200, 0],
			["EEST", 1648764000, 10800, 1],
			["EET", 1666908000, 7200, 0],
		],
		"Asia/Anadyr": [
			["+12", -4260211200, 43200, 0],
		],
		"Asia/Aqtau": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Aqtobe": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Ashgabat": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Atyrau": [
			["+03", -4260211200, 10800, 0],
		],
		"Asia/Baghdad": [
			["BMT", -4260211200, 10656, 0],
		],
		"Asia/Bahrain": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Baku": [
			["+05", 1332633600, 18000, 1],
			["+04", 1351382400, 14400, 0],
			["+05", 1364688000, 18000, 1],
			["+04", 1382832000, 14400, 0],
			["+05", 1396137600, 18000, 1],
			["+04", 1414281600, 14400, 0],
			["+05", 1427587200, 18000, 1],
			["+04", 1445731200, 14400, 0],
		],
		"Asia/Bangkok": [
			["BMT", -4260211200, 24124, 0],
		],
		"Asia/Barnaul": [
			["+06", 1414263600, 21600, 0],
			["+07", 1459022400, 25200, 0],
		],
		"Asia/Beirut": [
			["EEST", 1332626400, 10800, 1],
			["EET", 1351371600, 7200, 0],
			["EEST", 1364680800, 10800, 1],
			["EET", 1382821200, 7200, 0],
			["EEST", 1396130400, 10800, 1],
			["EET", 1414270800, 7200, 0],
			["EEST", 1427580000, 10800, 1],
			["EET", 1445720400, 7200, 0],
			["EEST", 1459029600, 10800, 1],
			["EET", 1477774800, 7200, 0],
			["EEST", 1490479200, 10800, 1],
			["EET", 1509224400, 7200, 0],
			["EEST", 1521928800, 10800, 1],
			["EET", 1540674000, 7200, 0],
			["EEST", 1553983200, 10800, 1],
			["EET", 1572123600, 7200, 0],
			["EEST", 1585432800, 10800, 1],
			["EET", 1603573200, 7200, 0],
			["EEST", 1616882400, 10800, 1],
			["EET", 1635627600, 7200, 0],
			["EEST", 1648332000, 10800, 1],
			["EET", 1667077200, 7200, 0],
		],
		"Asia/Bishkek": [
			["+05", -4260211200, 18000, 0],
		],
		"Asia/Brunei": [
			["+0730", -4260211200, 27000, 0],
		],
		"Asia/Chita": [
			["+08", 1414252800, 28800, 0],
			["+09", 1459015200, 32400, 0],
		],
		"Asia/Choibalsan": [
			["+09", 1427479200, 32400, 1],
			["+08", 1443193200, 28800, 0],
			["+09", 1458928800, 32400, 1],
			["+08", 1474642800, 28800, 0],
		],
		"Asia/Colombo": [
			["MMT", -4260211200, 19172, 0],
		],
		"Asia/Damascus": [
			["EEST", 1333058400, 10800, 1],
			["EET", 1351198800, 7200, 0],
			["EEST", 1364508000, 10800, 1],
			["EET", 1382648400, 7200, 0],
			["EEST", 1395957600, 10800, 1],
			["EET", 1414702800, 7200, 0],
			["EEST", 1427407200, 10800, 1],
			["EET", 1446152400, 7200, 0],
			["EEST", 1458856800, 10800, 1],
			["EET", 1477602000, 7200, 0],
			["EEST", 1490911200, 10800, 1],
			["EET", 1509051600, 7200, 0],
			["EEST", 1522360800, 10800, 1],
			["EET", 1540501200, 7200, 0],
			["EEST", 1553810400, 10800, 1],
			["EET", 1571950800, 7200, 0],
			["EEST", 1585260000, 10800, 1],
			["EET", 1604005200, 7200, 0],
			["EEST", 1616709600, 10800, 1],
			["EET", 1635454800, 7200, 0],
			["EEST", 1648159200, 10800, 1],
			["EET", 1666904400, 7200, 0],
		],
		"Asia/Dhaka": [
			["HMT", -4260211200, 21200, 0],
		],
		"Asia/Dili": [
			["+08", -4260211200, 28800, 0],
		],
		"Asia/Dubai": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Dushanbe": [
			["+05", -4260211200, 18000, 0],
		],
		"Asia/Famagusta": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["+03", 1473282000, 10800, 0],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Asia/Gaza": [
			["EEST", 1333058400, 10800, 1],
			["EET", 1348178400, 7200, 0],
			["EEST", 1364508000, 10800, 1],
			["EET", 1380229200, 7200, 0],
			["EEST", 1395957600, 10800, 1],
			["EET", 1414098000, 7200, 0],
			["EEST", 1427493600, 10800, 1],
			["EET", 1445547600, 7200, 0],
			["EEST", 1458946800, 10800, 1],
			["EET", 1477692000, 7200, 0],
			["EEST", 1490396400, 10800, 1],
			["EET", 1509141600, 7200, 0],
			["EEST", 1521846000, 10800, 1],
			["EET", 1540591200, 7200, 0],
			["EEST", 1553295600, 10800, 1],
			["EET", 1572040800, 7200, 0],
			["EEST", 1585350000, 10800, 1],
			["EET", 1604095200, 7200, 0],
			["EEST", 1616799600, 10800, 1],
			["EET", 1635544800, 7200, 0],
			["EEST", 1648249200, 10800, 1],
			["EET", 1666994400, 7200, 0],
		],
		"Asia/Hebron": [
			["EEST", 1333058400, 10800, 1],
			["EET", 1348178400, 7200, 0],
			["EEST", 1364508000, 10800, 1],
			["EET", 1380229200, 7200, 0],
			["EEST", 1395957600, 10800, 1],
			["EET", 1414098000, 7200, 0],
			["EEST", 1427493600, 10800, 1],
			["EET", 1445547600, 7200, 0],
			["EEST", 1458946800, 10800, 1],
			["EET", 1477692000, 7200, 0],
			["EEST", 1490396400, 10800, 1],
			["EET", 1509141600, 7200, 0],
			["EEST", 1521846000, 10800, 1],
			["EET", 1540591200, 7200, 0],
			["EEST", 1553295600, 10800, 1],
			["EET", 1572040800, 7200, 0],
			["EEST", 1585350000, 10800, 1],
			["EET", 1604095200, 7200, 0],
			["EEST", 1616799600, 10800, 1],
			["EET", 1635544800, 7200, 0],
			["EEST", 1648249200, 10800, 1],
			["EET", 1666994400, 7200, 0],
		],
		"Asia/Ho_Chi_Minh": [
			["PLMT", -4260211200, 25590, 0],
		],
		"Asia/Hong_Kong": [
			["HKT", -4260211200, 28800, 0],
		],
		"Asia/Hovd": [
			["+08", 1427482800, 28800, 1],
			["+07", 1443196800, 25200, 0],
			["+08", 1458932400, 28800, 1],
			["+07", 1474646400, 25200, 0],
		],
		"Asia/Irkutsk": [
			["+08", 1414256400, 28800, 0],
		],
		"Asia/Jakarta": [
			["BMT", -4260211200, 25632, 0],
		],
		"Asia/Jayapura": [
			["+09", -4260211200, 32400, 0],
		],
		"Asia/Jerusalem": [
			["IDT", 1333065600, 10800, 1],
			["IST", 1348354800, 7200, 0],
			["IDT", 1364515200, 10800, 1],
			["IST", 1382828400, 7200, 0],
			["IDT", 1395964800, 10800, 1],
			["IST", 1414278000, 7200, 0],
			["IDT", 1427414400, 10800, 1],
			["IST", 1445727600, 7200, 0],
			["IDT", 1458864000, 10800, 1],
			["IST", 1477782000, 7200, 0],
			["IDT", 1490313600, 10800, 1],
			["IST", 1509231600, 7200, 0],
			["IDT", 1521763200, 10800, 1],
			["IST", 1540681200, 7200, 0],
			["IDT", 1553817600, 10800, 1],
			["IST", 1572130800, 7200, 0],
			["IDT", 1585267200, 10800, 1],
			["IST", 1603580400, 7200, 0],
			["IDT", 1616716800, 10800, 1],
			["IST", 1635634800, 7200, 0],
			["IDT", 1648166400, 10800, 1],
			["IST", 1667084400, 7200, 0],
		],
		"Asia/Kabul": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Kamchatka": [
			["+11", -4260211200, 39600, 0],
		],
		"Asia/Karachi": [
			["+0530", -4260211200, 19800, 0],
		],
		"Asia/Kathmandu": [
			["+0530", -4260211200, 19800, 0],
		],
		"Asia/Khandyga": [
			["+09", 1414252800, 32400, 0],
		],
		"Asia/Kolkata": [
			["HMT", -4260211200, 21200, 0],
		],
		"Asia/Krasnoyarsk": [
			["+07", 1414260000, 25200, 0],
		],
		"Asia/Kuala_Lumpur": [
			["SMT", -4260211200, 24925, 0],
		],
		"Asia/Kuching": [
			["+0730", -4260211200, 27000, 0],
		],
		"Asia/Kuwait": [
			["+03", -4260211200, 10800, 0],
		],
		"Asia/Macau": [
			["CST", -4260211200, 28800, 0],
		],
		"Asia/Magadan": [
			["+10", 1414245600, 36000, 0],
			["+11", 1461427200, 39600, 0],
		],
		"Asia/Makassar": [
			["MMT", -4260211200, 28656, 0],
		],
		"Asia/Manila": [
			["+08", -4260211200, 28800, 0],
		],
		"Asia/Muscat": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Nicosia": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Asia/Novokuznetsk": [
			["+06", -4260211200, 21600, 0],
		],
		"Asia/Novosibirsk": [
			["+06", 1414263600, 21600, 0],
			["+07", 1469304000, 25200, 0],
		],
		"Asia/Omsk": [
			["+06", 1414263600, 21600, 0],
		],
		"Asia/Oral": [
			["+03", -4260211200, 10800, 0],
		],
		"Asia/Phnom_Penh": [
			["BMT", -4260211200, 24124, 0],
		],
		"Asia/Pontianak": [
			["PMT", -4260211200, 26240, 0],
		],
		"Asia/Pyongyang": [
			["KST", 1439564400, 30600, 0],
		],
		"Asia/Qatar": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Qyzylorda": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Riyadh": [
			["+03", -4260211200, 10800, 0],
		],
		"Asia/Sakhalin": [
			["+10", 1414249200, 36000, 0],
			["+11", 1459008000, 39600, 0],
		],
		"Asia/Samarkand": [
			["+04", -4260211200, 14400, 0],
		],
		"Asia/Seoul": [
			["KST", -4260211200, 30600, 0],
		],
		"Asia/Shanghai": [
			["CST", -4260211200, 28800, 0],
		],
		"Asia/Singapore": [
			["SMT", -4260211200, 24925, 0],
		],
		"Asia/Srednekolymsk": [
			["+11", 1414245600, 39600, 0],
		],
		"Asia/Taipei": [
			["CST", -4260211200, 28800, 0],
		],
		"Asia/Tashkent": [
			["+05", -4260211200, 18000, 0],
		],
		"Asia/Tbilisi": [
			["TBMT", -4260211200, 10751, 0],
		],
		"Asia/Tehran": [
			["+0430", 1332275400, 16200, 1],
			["+0330", 1348169400, 12600, 0],
			["+0430", 1363897800, 16200, 1],
			["+0330", 1379791800, 12600, 0],
			["+0430", 1395433800, 16200, 1],
			["+0330", 1411327800, 12600, 0],
			["+0430", 1426969800, 16200, 1],
			["+0330", 1442863800, 12600, 0],
			["+0430", 1458505800, 16200, 1],
			["+0330", 1474399800, 12600, 0],
			["+0430", 1490128200, 16200, 1],
			["+0330", 1506022200, 12600, 0],
			["+0430", 1521664200, 16200, 1],
			["+0330", 1537558200, 12600, 0],
			["+0430", 1553200200, 16200, 1],
			["+0330", 1569094200, 12600, 0],
			["+0430", 1584736200, 16200, 1],
			["+0330", 1600630200, 12600, 0],
			["+0430", 1616358600, 16200, 1],
			["+0330", 1632252600, 12600, 0],
			["+0430", 1647894600, 16200, 1],
			["+0330", 1663788600, 12600, 0],
		],
		"Asia/Thimphu": [
			["+0530", -4260211200, 19800, 0],
		],
		"Asia/Tokyo": [
			["JST", -4260211200, 32400, 0],
		],
		"Asia/Tomsk": [
			["+06", 1414263600, 21600, 0],
			["+07", 1464465600, 25200, 0],
		],
		"Asia/Ulaanbaatar": [
			["+09", 1427479200, 32400, 1],
			["+08", 1443193200, 28800, 0],
			["+09", 1458928800, 32400, 1],
			["+08", 1474642800, 28800, 0],
		],
		"Asia/Urumqi": [
			["+06", -4260211200, 21600, 0],
		],
		"Asia/Ust-Nera": [
			["+10", 1414249200, 36000, 0],
		],
		"Asia/Vientiane": [
			["BMT", -4260211200, 24124, 0],
		],
		"Asia/Vladivostok": [
			["+10", 1414249200, 36000, 0],
		],
		"Asia/Yakutsk": [
			["+09", 1414252800, 32400, 0],
		],
		"Asia/Yangon": [
			["RMT", -4260211200, 23087, 0],
		],
		"Asia/Yekaterinburg": [
			["+05", 1414267200, 18000, 0],
		],
		"Asia/Yerevan": [
			["+03", -4260211200, 10800, 0],
		],
		"Atlantic/Azores": [
			["+00", 1332637200, 0, 1],
			["-01", 1351386000, -3600, 0],
			["+00", 1364691600, 0, 1],
			["-01", 1382835600, -3600, 0],
			["+00", 1396141200, 0, 1],
			["-01", 1414285200, -3600, 0],
			["+00", 1427590800, 0, 1],
			["-01", 1445734800, -3600, 0],
			["+00", 1459040400, 0, 1],
			["-01", 1477789200, -3600, 0],
			["+00", 1490490000, 0, 1],
			["-01", 1509238800, -3600, 0],
			["+00", 1521939600, 0, 1],
			["-01", 1540688400, -3600, 0],
			["+00", 1553994000, 0, 1],
			["-01", 1572138000, -3600, 0],
			["+00", 1585443600, 0, 1],
			["-01", 1603587600, -3600, 0],
			["+00", 1616893200, 0, 1],
			["-01", 1635642000, -3600, 0],
			["+00", 1648342800, 0, 1],
			["-01", 1667091600, -3600, 0],
		],
		"Atlantic/Bermuda": [
			["ADT", 1331445600, -10800, 1],
			["AST", 1352005200, -14400, 0],
			["ADT", 1362895200, -10800, 1],
			["AST", 1383454800, -14400, 0],
			["ADT", 1394344800, -10800, 1],
			["AST", 1414904400, -14400, 0],
			["ADT", 1425794400, -10800, 1],
			["AST", 1446354000, -14400, 0],
			["ADT", 1457848800, -10800, 1],
			["AST", 1478408400, -14400, 0],
			["ADT", 1489298400, -10800, 1],
			["AST", 1509858000, -14400, 0],
			["ADT", 1520748000, -10800, 1],
			["AST", 1541307600, -14400, 0],
			["ADT", 1552197600, -10800, 1],
			["AST", 1572757200, -14400, 0],
			["ADT", 1583647200, -10800, 1],
			["AST", 1604206800, -14400, 0],
			["ADT", 1615701600, -10800, 1],
			["AST", 1636261200, -14400, 0],
			["ADT", 1647151200, -10800, 1],
			["AST", 1667710800, -14400, 0],
		],
		"Atlantic/Canary": [
			["WEST", 1332637200, 3600, 1],
			["WET", 1351386000, 0, 0],
			["WEST", 1364691600, 3600, 1],
			["WET", 1382835600, 0, 0],
			["WEST", 1396141200, 3600, 1],
			["WET", 1414285200, 0, 0],
			["WEST", 1427590800, 3600, 1],
			["WET", 1445734800, 0, 0],
			["WEST", 1459040400, 3600, 1],
			["WET", 1477789200, 0, 0],
			["WEST", 1490490000, 3600, 1],
			["WET", 1509238800, 0, 0],
			["WEST", 1521939600, 3600, 1],
			["WET", 1540688400, 0, 0],
			["WEST", 1553994000, 3600, 1],
			["WET", 1572138000, 0, 0],
			["WEST", 1585443600, 3600, 1],
			["WET", 1603587600, 0, 0],
			["WEST", 1616893200, 3600, 1],
			["WET", 1635642000, 0, 0],
			["WEST", 1648342800, 3600, 1],
			["WET", 1667091600, 0, 0],
		],
		"Atlantic/Cape_Verde": [
			["-02", -4260211200, -7200, 0],
		],
		"Atlantic/Faroe": [
			["WEST", 1332637200, 3600, 1],
			["WET", 1351386000, 0, 0],
			["WEST", 1364691600, 3600, 1],
			["WET", 1382835600, 0, 0],
			["WEST", 1396141200, 3600, 1],
			["WET", 1414285200, 0, 0],
			["WEST", 1427590800, 3600, 1],
			["WET", 1445734800, 0, 0],
			["WEST", 1459040400, 3600, 1],
			["WET", 1477789200, 0, 0],
			["WEST", 1490490000, 3600, 1],
			["WET", 1509238800, 0, 0],
			["WEST", 1521939600, 3600, 1],
			["WET", 1540688400, 0, 0],
			["WEST", 1553994000, 3600, 1],
			["WET", 1572138000, 0, 0],
			["WEST", 1585443600, 3600, 1],
			["WET", 1603587600, 0, 0],
			["WEST", 1616893200, 3600, 1],
			["WET", 1635642000, 0, 0],
			["WEST", 1648342800, 3600, 1],
			["WET", 1667091600, 0, 0],
		],
		"Atlantic/Madeira": [
			["WEST", 1332637200, 3600, 1],
			["WET", 1351386000, 0, 0],
			["WEST", 1364691600, 3600, 1],
			["WET", 1382835600, 0, 0],
			["WEST", 1396141200, 3600, 1],
			["WET", 1414285200, 0, 0],
			["WEST", 1427590800, 3600, 1],
			["WET", 1445734800, 0, 0],
			["WEST", 1459040400, 3600, 1],
			["WET", 1477789200, 0, 0],
			["WEST", 1490490000, 3600, 1],
			["WET", 1509238800, 0, 0],
			["WEST", 1521939600, 3600, 1],
			["WET", 1540688400, 0, 0],
			["WEST", 1553994000, 3600, 1],
			["WET", 1572138000, 0, 0],
			["WEST", 1585443600, 3600, 1],
			["WET", 1603587600, 0, 0],
			["WEST", 1616893200, 3600, 1],
			["WET", 1635642000, 0, 0],
			["WEST", 1648342800, 3600, 1],
			["WET", 1667091600, 0, 0],
		],
		"Atlantic/Reykjavik": [
			["-01", -4260211200, -3600, 0],
		],
		"Atlantic/South_Georgia": [
			["-02", -4260211200, -7200, 0],
		],
		"Atlantic/St_Helena": [
			["GMT", -4260211200, 0, 0],
		],
		"Atlantic/Stanley": [
			["SMT", -4260211200, -13884, 0],
		],
		"Australia/Adelaide": [
			["ACST", 1333211400, 34200, 0],
			["ACDT", 1349541000, 37800, 1],
			["ACST", 1365265800, 34200, 0],
			["ACDT", 1380990600, 37800, 1],
			["ACST", 1396715400, 34200, 0],
			["ACDT", 1412440200, 37800, 1],
			["ACST", 1428165000, 34200, 0],
			["ACDT", 1443889800, 37800, 1],
			["ACST", 1459614600, 34200, 0],
			["ACDT", 1475339400, 37800, 1],
			["ACST", 1491064200, 34200, 0],
			["ACDT", 1506789000, 37800, 1],
			["ACST", 1522513800, 34200, 0],
			["ACDT", 1538843400, 37800, 1],
			["ACST", 1554568200, 34200, 0],
			["ACDT", 1570293000, 37800, 1],
			["ACST", 1586017800, 34200, 0],
			["ACDT", 1601742600, 37800, 1],
			["ACST", 1617467400, 34200, 0],
			["ACDT", 1633192200, 37800, 1],
			["ACST", 1648917000, 34200, 0],
			["ACDT", 1664641800, 37800, 1],
		],
		"Australia/Brisbane": [
			["AEST", -4260211200, 36000, 0],
		],
		"Australia/Broken_Hill": [
			["ACST", 1333211400, 34200, 0],
			["ACDT", 1349541000, 37800, 1],
			["ACST", 1365265800, 34200, 0],
			["ACDT", 1380990600, 37800, 1],
			["ACST", 1396715400, 34200, 0],
			["ACDT", 1412440200, 37800, 1],
			["ACST", 1428165000, 34200, 0],
			["ACDT", 1443889800, 37800, 1],
			["ACST", 1459614600, 34200, 0],
			["ACDT", 1475339400, 37800, 1],
			["ACST", 1491064200, 34200, 0],
			["ACDT", 1506789000, 37800, 1],
			["ACST", 1522513800, 34200, 0],
			["ACDT", 1538843400, 37800, 1],
			["ACST", 1554568200, 34200, 0],
			["ACDT", 1570293000, 37800, 1],
			["ACST", 1586017800, 34200, 0],
			["ACDT", 1601742600, 37800, 1],
			["ACST", 1617467400, 34200, 0],
			["ACDT", 1633192200, 37800, 1],
			["ACST", 1648917000, 34200, 0],
			["ACDT", 1664641800, 37800, 1],
		],
		"Australia/Currie": [
			["AEST", 1333209600, 36000, 0],
			["AEDT", 1349539200, 39600, 1],
			["AEST", 1365264000, 36000, 0],
			["AEDT", 1380988800, 39600, 1],
			["AEST", 1396713600, 36000, 0],
			["AEDT", 1412438400, 39600, 1],
			["AEST", 1428163200, 36000, 0],
			["AEDT", 1443888000, 39600, 1],
			["AEST", 1459612800, 36000, 0],
			["AEDT", 1475337600, 39600, 1],
			["AEST", 1491062400, 36000, 0],
			["AEDT", 1506787200, 39600, 1],
			["AEST", 1522512000, 36000, 0],
			["AEDT", 1538841600, 39600, 1],
			["AEST", 1554566400, 36000, 0],
			["AEDT", 1570291200, 39600, 1],
			["AEST", 1586016000, 36000, 0],
			["AEDT", 1601740800, 39600, 1],
			["AEST", 1617465600, 36000, 0],
			["AEDT", 1633190400, 39600, 1],
			["AEST", 1648915200, 36000, 0],
			["AEDT", 1664640000, 39600, 1],
		],
		"Australia/Darwin": [
			["ACST", -4260211200, 32400, 0],
		],
		"Australia/Eucla": [
			["+0845", -4260211200, 31500, 0],
		],
		"Australia/Hobart": [
			["AEST", 1333209600, 36000, 0],
			["AEDT", 1349539200, 39600, 1],
			["AEST", 1365264000, 36000, 0],
			["AEDT", 1380988800, 39600, 1],
			["AEST", 1396713600, 36000, 0],
			["AEDT", 1412438400, 39600, 1],
			["AEST", 1428163200, 36000, 0],
			["AEDT", 1443888000, 39600, 1],
			["AEST", 1459612800, 36000, 0],
			["AEDT", 1475337600, 39600, 1],
			["AEST", 1491062400, 36000, 0],
			["AEDT", 1506787200, 39600, 1],
			["AEST", 1522512000, 36000, 0],
			["AEDT", 1538841600, 39600, 1],
			["AEST", 1554566400, 36000, 0],
			["AEDT", 1570291200, 39600, 1],
			["AEST", 1586016000, 36000, 0],
			["AEDT", 1601740800, 39600, 1],
			["AEST", 1617465600, 36000, 0],
			["AEDT", 1633190400, 39600, 1],
			["AEST", 1648915200, 36000, 0],
			["AEDT", 1664640000, 39600, 1],
		],
		"Australia/Lindeman": [
			["AEST", -4260211200, 36000, 0],
		],
		"Australia/Lord_Howe": [
			["+1030", 1333206000, 37800, 0],
			["+11", 1349537400, 39600, 1],
			["+1030", 1365260400, 37800, 0],
			["+11", 1380987000, 39600, 1],
			["+1030", 1396710000, 37800, 0],
			["+11", 1412436600, 39600, 1],
			["+1030", 1428159600, 37800, 0],
			["+11", 1443886200, 39600, 1],
			["+1030", 1459609200, 37800, 0],
			["+11", 1475335800, 39600, 1],
			["+1030", 1491058800, 37800, 0],
			["+11", 1506785400, 39600, 1],
			["+1030", 1522508400, 37800, 0],
			["+11", 1538839800, 39600, 1],
			["+1030", 1554562800, 37800, 0],
			["+11", 1570289400, 39600, 1],
			["+1030", 1586012400, 37800, 0],
			["+11", 1601739000, 39600, 1],
			["+1030", 1617462000, 37800, 0],
			["+11", 1633188600, 39600, 1],
			["+1030", 1648911600, 37800, 0],
			["+11", 1664638200, 39600, 1],
		],
		"Australia/Melbourne": [
			["AEST", 1333209600, 36000, 0],
			["AEDT", 1349539200, 39600, 1],
			["AEST", 1365264000, 36000, 0],
			["AEDT", 1380988800, 39600, 1],
			["AEST", 1396713600, 36000, 0],
			["AEDT", 1412438400, 39600, 1],
			["AEST", 1428163200, 36000, 0],
			["AEDT", 1443888000, 39600, 1],
			["AEST", 1459612800, 36000, 0],
			["AEDT", 1475337600, 39600, 1],
			["AEST", 1491062400, 36000, 0],
			["AEDT", 1506787200, 39600, 1],
			["AEST", 1522512000, 36000, 0],
			["AEDT", 1538841600, 39600, 1],
			["AEST", 1554566400, 36000, 0],
			["AEDT", 1570291200, 39600, 1],
			["AEST", 1586016000, 36000, 0],
			["AEDT", 1601740800, 39600, 1],
			["AEST", 1617465600, 36000, 0],
			["AEDT", 1633190400, 39600, 1],
			["AEST", 1648915200, 36000, 0],
			["AEDT", 1664640000, 39600, 1],
		],
		"Australia/Perth": [
			["AWST", -4260211200, 28800, 0],
		],
		"Australia/Sydney": [
			["AEST", 1333209600, 36000, 0],
			["AEDT", 1349539200, 39600, 1],
			["AEST", 1365264000, 36000, 0],
			["AEDT", 1380988800, 39600, 1],
			["AEST", 1396713600, 36000, 0],
			["AEDT", 1412438400, 39600, 1],
			["AEST", 1428163200, 36000, 0],
			["AEDT", 1443888000, 39600, 1],
			["AEST", 1459612800, 36000, 0],
			["AEDT", 1475337600, 39600, 1],
			["AEST", 1491062400, 36000, 0],
			["AEDT", 1506787200, 39600, 1],
			["AEST", 1522512000, 36000, 0],
			["AEDT", 1538841600, 39600, 1],
			["AEST", 1554566400, 36000, 0],
			["AEDT", 1570291200, 39600, 1],
			["AEST", 1586016000, 36000, 0],
			["AEDT", 1601740800, 39600, 1],
			["AEST", 1617465600, 36000, 0],
			["AEDT", 1633190400, 39600, 1],
			["AEST", 1648915200, 36000, 0],
			["AEDT", 1664640000, 39600, 1],
		],
		"Europe/Amsterdam": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Andorra": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Astrakhan": [
			["+03", 1414274400, 10800, 0],
			["+04", 1459033200, 14400, 0],
		],
		"Europe/Athens": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Belgrade": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Berlin": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Bratislava": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Brussels": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Bucharest": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Budapest": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Busingen": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Chisinau": [
			["EEST", 1332633600, 10800, 1],
			["EET", 1351382400, 7200, 0],
			["EEST", 1364688000, 10800, 1],
			["EET", 1382832000, 7200, 0],
			["EEST", 1396137600, 10800, 1],
			["EET", 1414281600, 7200, 0],
			["EEST", 1427587200, 10800, 1],
			["EET", 1445731200, 7200, 0],
			["EEST", 1459036800, 10800, 1],
			["EET", 1477785600, 7200, 0],
			["EEST", 1490486400, 10800, 1],
			["EET", 1509235200, 7200, 0],
			["EEST", 1521936000, 10800, 1],
			["EET", 1540684800, 7200, 0],
			["EEST", 1553990400, 10800, 1],
			["EET", 1572134400, 7200, 0],
			["EEST", 1585440000, 10800, 1],
			["EET", 1603584000, 7200, 0],
			["EEST", 1616889600, 10800, 1],
			["EET", 1635638400, 7200, 0],
			["EEST", 1648339200, 10800, 1],
			["EET", 1667088000, 7200, 0],
		],
		"Europe/Copenhagen": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Dublin": [
			["IST", 1332637200, 3600, 1],
			["GMT", 1351386000, 0, 0],
			["IST", 1364691600, 3600, 1],
			["GMT", 1382835600, 0, 0],
			["IST", 1396141200, 3600, 1],
			["GMT", 1414285200, 0, 0],
			["IST", 1427590800, 3600, 1],
			["GMT", 1445734800, 0, 0],
			["IST", 1459040400, 3600, 1],
			["GMT", 1477789200, 0, 0],
			["IST", 1490490000, 3600, 1],
			["GMT", 1509238800, 0, 0],
			["IST", 1521939600, 3600, 1],
			["GMT", 1540688400, 0, 0],
			["IST", 1553994000, 3600, 1],
			["GMT", 1572138000, 0, 0],
			["IST", 1585443600, 3600, 1],
			["GMT", 1603587600, 0, 0],
			["IST", 1616893200, 3600, 1],
			["GMT", 1635642000, 0, 0],
			["IST", 1648342800, 3600, 1],
			["GMT", 1667091600, 0, 0],
		],
		"Europe/Gibraltar": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Guernsey": [
			["BST", 1332637200, 3600, 1],
			["GMT", 1351386000, 0, 0],
			["BST", 1364691600, 3600, 1],
			["GMT", 1382835600, 0, 0],
			["BST", 1396141200, 3600, 1],
			["GMT", 1414285200, 0, 0],
			["BST", 1427590800, 3600, 1],
			["GMT", 1445734800, 0, 0],
			["BST", 1459040400, 3600, 1],
			["GMT", 1477789200, 0, 0],
			["BST", 1490490000, 3600, 1],
			["GMT", 1509238800, 0, 0],
			["BST", 1521939600, 3600, 1],
			["GMT", 1540688400, 0, 0],
			["BST", 1553994000, 3600, 1],
			["GMT", 1572138000, 0, 0],
			["BST", 1585443600, 3600, 1],
			["GMT", 1603587600, 0, 0],
			["BST", 1616893200, 3600, 1],
			["GMT", 1635642000, 0, 0],
			["BST", 1648342800, 3600, 1],
			["GMT", 1667091600, 0, 0],
		],
		"Europe/Helsinki": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Isle_of_Man": [
			["BST", 1332637200, 3600, 1],
			["GMT", 1351386000, 0, 0],
			["BST", 1364691600, 3600, 1],
			["GMT", 1382835600, 0, 0],
			["BST", 1396141200, 3600, 1],
			["GMT", 1414285200, 0, 0],
			["BST", 1427590800, 3600, 1],
			["GMT", 1445734800, 0, 0],
			["BST", 1459040400, 3600, 1],
			["GMT", 1477789200, 0, 0],
			["BST", 1490490000, 3600, 1],
			["GMT", 1509238800, 0, 0],
			["BST", 1521939600, 3600, 1],
			["GMT", 1540688400, 0, 0],
			["BST", 1553994000, 3600, 1],
			["GMT", 1572138000, 0, 0],
			["BST", 1585443600, 3600, 1],
			["GMT", 1603587600, 0, 0],
			["BST", 1616893200, 3600, 1],
			["GMT", 1635642000, 0, 0],
			["BST", 1648342800, 3600, 1],
			["GMT", 1667091600, 0, 0],
		],
		"Europe/Istanbul": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396227600, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1446944400, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["+03", 1473195600, 10800, 0],
		],
		"Europe/Jersey": [
			["BST", 1332637200, 3600, 1],
			["GMT", 1351386000, 0, 0],
			["BST", 1364691600, 3600, 1],
			["GMT", 1382835600, 0, 0],
			["BST", 1396141200, 3600, 1],
			["GMT", 1414285200, 0, 0],
			["BST", 1427590800, 3600, 1],
			["GMT", 1445734800, 0, 0],
			["BST", 1459040400, 3600, 1],
			["GMT", 1477789200, 0, 0],
			["BST", 1490490000, 3600, 1],
			["GMT", 1509238800, 0, 0],
			["BST", 1521939600, 3600, 1],
			["GMT", 1540688400, 0, 0],
			["BST", 1553994000, 3600, 1],
			["GMT", 1572138000, 0, 0],
			["BST", 1585443600, 3600, 1],
			["GMT", 1603587600, 0, 0],
			["BST", 1616893200, 3600, 1],
			["GMT", 1635642000, 0, 0],
			["BST", 1648342800, 3600, 1],
			["GMT", 1667091600, 0, 0],
		],
		"Europe/Kaliningrad": [
			["EET", 1414278000, 7200, 0],
		],
		"Europe/Kiev": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Kirov": [
			["+03", 1414274400, 10800, 0],
		],
		"Europe/Lisbon": [
			["WEST", 1332637200, 3600, 1],
			["WET", 1351386000, 0, 0],
			["WEST", 1364691600, 3600, 1],
			["WET", 1382835600, 0, 0],
			["WEST", 1396141200, 3600, 1],
			["WET", 1414285200, 0, 0],
			["WEST", 1427590800, 3600, 1],
			["WET", 1445734800, 0, 0],
			["WEST", 1459040400, 3600, 1],
			["WET", 1477789200, 0, 0],
			["WEST", 1490490000, 3600, 1],
			["WET", 1509238800, 0, 0],
			["WEST", 1521939600, 3600, 1],
			["WET", 1540688400, 0, 0],
			["WEST", 1553994000, 3600, 1],
			["WET", 1572138000, 0, 0],
			["WEST", 1585443600, 3600, 1],
			["WET", 1603587600, 0, 0],
			["WEST", 1616893200, 3600, 1],
			["WET", 1635642000, 0, 0],
			["WEST", 1648342800, 3600, 1],
			["WET", 1667091600, 0, 0],
		],
		"Europe/Ljubljana": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/London": [
			["BST", 1332637200, 3600, 1],
			["GMT", 1351386000, 0, 0],
			["BST", 1364691600, 3600, 1],
			["GMT", 1382835600, 0, 0],
			["BST", 1396141200, 3600, 1],
			["GMT", 1414285200, 0, 0],
			["BST", 1427590800, 3600, 1],
			["GMT", 1445734800, 0, 0],
			["BST", 1459040400, 3600, 1],
			["GMT", 1477789200, 0, 0],
			["BST", 1490490000, 3600, 1],
			["GMT", 1509238800, 0, 0],
			["BST", 1521939600, 3600, 1],
			["GMT", 1540688400, 0, 0],
			["BST", 1553994000, 3600, 1],
			["GMT", 1572138000, 0, 0],
			["BST", 1585443600, 3600, 1],
			["GMT", 1603587600, 0, 0],
			["BST", 1616893200, 3600, 1],
			["GMT", 1635642000, 0, 0],
			["BST", 1648342800, 3600, 1],
			["GMT", 1667091600, 0, 0],
		],
		"Europe/Luxembourg": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Madrid": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Malta": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Mariehamn": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Minsk": [
			["MMT", -4260211200, 6600, 0],
		],
		"Europe/Monaco": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Moscow": [
			["MSK", 1414274400, 10800, 0],
		],
		"Europe/Oslo": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Paris": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Podgorica": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Prague": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Riga": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Rome": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Samara": [
			["+03", -4260211200, 10800, 0],
		],
		"Europe/San_Marino": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Sarajevo": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Saratov": [
			["+03", 1414274400, 10800, 0],
			["+04", 1480806000, 14400, 0],
		],
		"Europe/Simferopol": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["MSK", 1396137600, 14400, 0],
			["MSK", 1414274400, 10800, 0],
		],
		"Europe/Skopje": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Sofia": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Stockholm": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Tallinn": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Tirane": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Ulyanovsk": [
			["+03", 1414274400, 10800, 0],
			["+04", 1459033200, 14400, 0],
		],
		"Europe/Uzhgorod": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Vaduz": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Vatican": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Vienna": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Vilnius": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Volgograd": [
			["+03", 1414274400, 10800, 0],
		],
		"Europe/Warsaw": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Zagreb": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Europe/Zaporozhye": [
			["EEST", 1332637200, 10800, 1],
			["EET", 1351386000, 7200, 0],
			["EEST", 1364691600, 10800, 1],
			["EET", 1382835600, 7200, 0],
			["EEST", 1396141200, 10800, 1],
			["EET", 1414285200, 7200, 0],
			["EEST", 1427590800, 10800, 1],
			["EET", 1445734800, 7200, 0],
			["EEST", 1459040400, 10800, 1],
			["EET", 1477789200, 7200, 0],
			["EEST", 1490490000, 10800, 1],
			["EET", 1509238800, 7200, 0],
			["EEST", 1521939600, 10800, 1],
			["EET", 1540688400, 7200, 0],
			["EEST", 1553994000, 10800, 1],
			["EET", 1572138000, 7200, 0],
			["EEST", 1585443600, 10800, 1],
			["EET", 1603587600, 7200, 0],
			["EEST", 1616893200, 10800, 1],
			["EET", 1635642000, 7200, 0],
			["EEST", 1648342800, 10800, 1],
			["EET", 1667091600, 7200, 0],
		],
		"Europe/Zurich": [
			["CEST", 1332637200, 7200, 1],
			["CET", 1351386000, 3600, 0],
			["CEST", 1364691600, 7200, 1],
			["CET", 1382835600, 3600, 0],
			["CEST", 1396141200, 7200, 1],
			["CET", 1414285200, 3600, 0],
			["CEST", 1427590800, 7200, 1],
			["CET", 1445734800, 3600, 0],
			["CEST", 1459040400, 7200, 1],
			["CET", 1477789200, 3600, 0],
			["CEST", 1490490000, 7200, 1],
			["CET", 1509238800, 3600, 0],
			["CEST", 1521939600, 7200, 1],
			["CET", 1540688400, 3600, 0],
			["CEST", 1553994000, 7200, 1],
			["CET", 1572138000, 3600, 0],
			["CEST", 1585443600, 7200, 1],
			["CET", 1603587600, 3600, 0],
			["CEST", 1616893200, 7200, 1],
			["CET", 1635642000, 3600, 0],
			["CEST", 1648342800, 7200, 1],
			["CET", 1667091600, 3600, 0],
		],
		"Indian/Antananarivo": [
			["EAT", -4260211200, 10800, 0],
		],
		"Indian/Chagos": [
			["+05", -4260211200, 18000, 0],
		],
		"Indian/Christmas": [
			["+07", -4260211200, 25200, 0],
		],
		"Indian/Cocos": [
			["+0630", -4260211200, 23400, 0],
		],
		"Indian/Comoro": [
			["EAT", -4260211200, 10800, 0],
		],
		"Indian/Kerguelen": [
			["+05", -4260211200, 18000, 0],
		],
		"Indian/Mahe": [
			["+04", -4260211200, 14400, 0],
		],
		"Indian/Maldives": [
			["MMT", -4260211200, 17640, 0],
		],
		"Indian/Mauritius": [
			["+04", -4260211200, 14400, 0],
		],
		"Indian/Mayotte": [
			["EAT", -4260211200, 10800, 0],
		],
		"Indian/Reunion": [
			["+04", -4260211200, 14400, 0],
		],
		"Pacific/Apia": [
			["+13", 1333202400, 46800, 0],
			["+14", 1348927200, 50400, 1],
			["+13", 1365256800, 46800, 0],
			["+14", 1380376800, 50400, 1],
			["+13", 1396706400, 46800, 0],
			["+14", 1411826400, 50400, 1],
			["+13", 1428156000, 46800, 0],
			["+14", 1443276000, 50400, 1],
			["+13", 1459605600, 46800, 0],
			["+14", 1474725600, 50400, 1],
			["+13", 1491055200, 46800, 0],
			["+14", 1506175200, 50400, 1],
			["+13", 1522504800, 46800, 0],
			["+14", 1538229600, 50400, 1],
			["+13", 1554559200, 46800, 0],
			["+14", 1569679200, 50400, 1],
			["+13", 1586008800, 46800, 0],
			["+14", 1601128800, 50400, 1],
			["+13", 1617458400, 46800, 0],
			["+14", 1632578400, 50400, 1],
			["+13", 1648908000, 46800, 0],
			["+14", 1664028000, 50400, 1],
		],
		"Pacific/Auckland": [
			["NZST", 1333202400, 43200, 0],
			["NZDT", 1348927200, 46800, 1],
			["NZST", 1365256800, 43200, 0],
			["NZDT", 1380376800, 46800, 1],
			["NZST", 1396706400, 43200, 0],
			["NZDT", 1411826400, 46800, 1],
			["NZST", 1428156000, 43200, 0],
			["NZDT", 1443276000, 46800, 1],
			["NZST", 1459605600, 43200, 0],
			["NZDT", 1474725600, 46800, 1],
			["NZST", 1491055200, 43200, 0],
			["NZDT", 1506175200, 46800, 1],
			["NZST", 1522504800, 43200, 0],
			["NZDT", 1538229600, 46800, 1],
			["NZST", 1554559200, 43200, 0],
			["NZDT", 1569679200, 46800, 1],
			["NZST", 1586008800, 43200, 0],
			["NZDT", 1601128800, 46800, 1],
			["NZST", 1617458400, 43200, 0],
			["NZDT", 1632578400, 46800, 1],
			["NZST", 1648908000, 43200, 0],
			["NZDT", 1664028000, 46800, 1],
		],
		"Pacific/Bougainville": [
			["+11", 1419696000, 39600, 0],
		],
		"Pacific/Chatham": [
			["+1245", 1333202400, 45900, 0],
			["+1345", 1348927200, 49500, 1],
			["+1245", 1365256800, 45900, 0],
			["+1345", 1380376800, 49500, 1],
			["+1245", 1396706400, 45900, 0],
			["+1345", 1411826400, 49500, 1],
			["+1245", 1428156000, 45900, 0],
			["+1345", 1443276000, 49500, 1],
			["+1245", 1459605600, 45900, 0],
			["+1345", 1474725600, 49500, 1],
			["+1245", 1491055200, 45900, 0],
			["+1345", 1506175200, 49500, 1],
			["+1245", 1522504800, 45900, 0],
			["+1345", 1538229600, 49500, 1],
			["+1245", 1554559200, 45900, 0],
			["+1345", 1569679200, 49500, 1],
			["+1245", 1586008800, 45900, 0],
			["+1345", 1601128800, 49500, 1],
			["+1245", 1617458400, 45900, 0],
			["+1345", 1632578400, 49500, 1],
			["+1245", 1648908000, 45900, 0],
			["+1345", 1664028000, 49500, 1],
		],
		"Pacific/Chuuk": [
			["+10", -4260211200, 36000, 0],
		],
		"Pacific/Easter": [
			["-06", 1335668400, -21600, 0],
			["-05", 1346558400, -18000, 1],
			["-06", 1367118000, -21600, 0],
			["-05", 1378612800, -18000, 1],
			["-06", 1398567600, -21600, 0],
			["-05", 1410062400, -18000, 1],
			["-06", 1463281200, -21600, 0],
			["-05", 1471147200, -18000, 1],
			["-06", 1494730800, -21600, 0],
			["-05", 1502596800, -18000, 1],
			["-06", 1526180400, -21600, 0],
			["-05", 1534046400, -18000, 1],
			["-06", 1557630000, -21600, 0],
			["-05", 1565496000, -18000, 1],
			["-06", 1589079600, -21600, 0],
			["-05", 1596945600, -18000, 1],
			["-06", 1620529200, -21600, 0],
			["-05", 1629000000, -18000, 1],
			["-06", 1652583600, -21600, 0],
			["-05", 1660449600, -18000, 1],
		],
		"Pacific/Efate": [
			["+11", -4260211200, 39600, 0],
		],
		"Pacific/Enderbury": [
			["-12", -4260211200, -43200, 0],
		],
		"Pacific/Fakaofo": [
			["-11", -4260211200, -39600, 0],
		],
		"Pacific/Fiji": [
			["+12", 1327154400, 43200, 0],
			["+13", 1350741600, 46800, 1],
			["+12", 1358604000, 43200, 0],
			["+13", 1382796000, 46800, 1],
			["+12", 1390050000, 43200, 0],
			["+13", 1414850400, 46800, 1],
			["+12", 1421503200, 43200, 0],
			["+13", 1446300000, 46800, 1],
			["+12", 1452952800, 43200, 0],
			["+13", 1478354400, 46800, 1],
			["+12", 1484402400, 43200, 0],
			["+13", 1509804000, 46800, 1],
			["+12", 1515852000, 43200, 0],
			["+13", 1541253600, 46800, 1],
			["+12", 1547906400, 43200, 0],
			["+13", 1572703200, 46800, 1],
			["+12", 1579356000, 43200, 0],
			["+13", 1604152800, 46800, 1],
			["+12", 1610805600, 43200, 0],
			["+13", 1636207200, 46800, 1],
			["+12", 1642255200, 43200, 0],
			["+13", 1667656800, 46800, 1],
		],
		"Pacific/Funafuti": [
			["+12", -4260211200, 43200, 0],
		],
		"Pacific/Galapagos": [
			["-05", -4260211200, -18000, 0],
		],
		"Pacific/Gambier": [
			["-09", -4260211200, -32400, 0],
		],
		"Pacific/Guadalcanal": [
			["+11", -4260211200, 39600, 0],
		],
		"Pacific/Guam": [
			["GST", -4260211200, 36000, 0],
		],
		"Pacific/Honolulu": [
			["HST", -4260211200, -37800, 0],
		],
		"Pacific/Kiritimati": [
			["-1040", -4260211200, -38400, 0],
		],
		"Pacific/Kosrae": [
			["+11", -4260211200, 39600, 0],
		],
		"Pacific/Kwajalein": [
			["+11", -4260211200, 39600, 0],
		],
		"Pacific/Majuro": [
			["+11", -4260211200, 39600, 0],
		],
		"Pacific/Marquesas": [
			["-0930", -4260211200, -34200, 0],
		],
		"Pacific/Midway": [
			["SST", -4260211200, -39600, 0],
		],
		"Pacific/Nauru": [
			["+1130", -4260211200, 41400, 0],
		],
		"Pacific/Niue": [
			["-1120", -4260211200, -40800, 0],
		],
		"Pacific/Norfolk": [
			["+11", 1443882600, 39600, 0],
		],
		"Pacific/Noumea": [
			["+11", -4260211200, 39600, 0],
		],
		"Pacific/Pago_Pago": [
			["SST", -4260211200, -39600, 0],
		],
		"Pacific/Palau": [
			["+09", -4260211200, 32400, 0],
		],
		"Pacific/Pitcairn": [
			["-0830", -4260211200, -30600, 0],
		],
		"Pacific/Pohnpei": [
			["+11", -4260211200, 39600, 0],
		],
		"Pacific/Port_Moresby": [
			["PMMT", -4260211200, 35312, 0],
		],
		"Pacific/Rarotonga": [
			["-1030", -4260211200, -37800, 0],
		],
		"Pacific/Saipan": [
			["GST", -4260211200, 36000, 0],
		],
		"Pacific/Tahiti": [
			["-10", -4260211200, -36000, 0],
		],
		"Pacific/Tarawa": [
			["+12", -4260211200, 43200, 0],
		],
		"Pacific/Tongatapu": [
			["+14", 1478350800, 50400, 1],
			["+13", 1484398800, 46800, 0],
		],
		"Pacific/Wake": [
			["+12", -4260211200, 43200, 0],
		],
		"Pacific/Wallis": [
			["+12", -4260211200, 43200, 0],
		],
	};
})();


/**
 * Get information about a specific timezone
 * @returns {Object}
 */
(function(){
	ProtoDate.getTZInfo = function(unix_timestamp, timezone){
		var row;
		if(undefined === ProtoDate.TZData[timezone]) throw new Error("No such timezone: "+timezone);
		var data = ProtoDate.TZData[timezone];
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

/**
 * Set the timezone of a given date
 * @returns {Date}
 */
(function(){
	ProtoDate.prototype.setTimezone = function(timezone){
		var timestamp = this.getUnixTimestamp();
		var tzdata = ProtoDate.getTZInfo(timestamp, timezone);
		var date = new ProtoDate((timestamp+tzdata.gmt_offset)*1000);
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

/**
 * Get the timezone of the date
 * @returns {String}
 */
(function(){
	ProtoDate.prototype.getTimezone = function(){
		return this._timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
	};
})();

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

/* istanbul ignore next */
if(!!(typeof module !== 'undefined' && module.exports)) module.exports = ProtoDate;