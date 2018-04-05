/**
 * protodate - v1.0.5
 * Makes JS Dates Manageable
 * @author Rob Parham
 * @website https://github.com/Pamblam/protodate
 * @license Apache-2.0
 */


(function(){
	"use strict";
	Date.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	Date.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	Date.PROTODATE_VERSION = '1.0.5';
})();

/**
 * Determine if a thing is a date
 * @returns {undefined}
 */
(function(){
	"use strict";
	Date.isDate = function(date){
		return !isNaN(date.getTime());
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
	Date.prototype.formatDate = function(date, format) {
		if (!Date.isDate(date)) return false;
		var buffer = []; 
		for(var i=0; i<format.length; i++){
			switch(format[i]){
				// If the current char is a "\" then skip it and add then next literal char
				case "\\": buffer.push(format[++i]); break;

				// Symbols that represent numbers
				case "Y": buffer.push("" + date.getFullYear()); break;
				case "y": buffer.push(("" + date.getFullYear()).substring(2)); break;
				case "m": buffer.push(("0" + (date.getMonth() + 1)).substr(-2, 2)); break;
				case "n": buffer.push("" + (date.getMonth() + 1)); break;
				case "t": buffer.push("" + new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()); break; 
				case "d": buffer.push(("0" + date.getDate()).substr(-2, 2)); break;
				case "j": buffer.push(date.getDate() + ""); break;
				case "w": buffer.push(date.getDay()); break;
				case "g": buffer.push("" + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())); break;
				case "G": buffer.push("" + (date.getHours())); break;
				case "h": buffer.push(("0" + (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())).substr(-2, 2)); break;
				case "H": buffer.push(("0" + (date.getHours()+"")).substr(-2, 2)); break;
				case "i": buffer.push(("0" + date.getMinutes()).substr(-2, 2)); break;
				case "s": buffer.push(("0" + date.getSeconds()).substr(-2, 2)); break;
				case "N": buffer.push(date.getDay()==0?7:date.getDay()); break;
				case "L": buffer.push((date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) || date.getFullYear() % 400 == 0 ? "1" : "0"); break;
				case "o": buffer.push(date.getMonth()==0&&date.getDate()<6&&date.getDay()<4?date.getFullYear()-1:date.getFullYear()); break;
				case "B": buffer.push(Math.floor((((date.getUTCHours() + 1) % 24) + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) * 1000 / 24)); break;
				case "v": buffer.push((date.getTime()+"").substr(-3)); break;
				case "Z": buffer.push(date.getTimezoneOffset()*60); break;
				case "U": buffer.push(Math.floor(date.getTime()/1000)); break;

				// Symbols that represent text
				case "a": buffer.push(date.getHours() > 11 ? "pm" : "am"); break;
				case "A": buffer.push(date.getHours() > 11 ? "PM" : "AM"); break;
				case "l": buffer.push(Date.DAYS[date.getDay()]); break;
				case "D": buffer.push(Date.DAYS[date.getDay()].substr(0, 3)); break;
				case "F": buffer.push(Date.MONTHS[date.getMonth()]); break;
				case "M": buffer.push(Date.MONTHS[date.getMonth()].substring(0, 3)); break;
				case "c": buffer.push(date.toISOString()); break;

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
					var startDate = new Date(date.getFullYear(), 0);
					var endDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
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
					var startDate = new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
					var dayNo = 0;
					while(startDate.getTime() < date.getTime()){
						dayNo++;
						startDate.setDate(startDate.getDate()+1);
					}
					buffer.push(dayNo);
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
	Date.validateFormat = function(dateStr, formatStr){
		for(var i=0; i<formatStr.length; i++){
			switch(formatStr[i]){
				case "\\": 
					if(!/^\\/.test(dateStr) || formatStr[++i] !== dateStr[1]) return false;
					dateStr = dateStr.substr(2);
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
					if(!m.length || +m[0]>12 || !+m[0] || m[0].length>1&&+m[0]<10) return false;
					dateStr = dateStr.substr(m[0].length);
					break;
				case "d":
					if(!/^(\d){2}/.test(dateStr) || +dateStr.substr(0,2)>31 || !+dateStr.substr(0,2)) return false;
					dateStr = dateStr.substr(2);
					break;
				case "j":
					var m = dateStr.match(/^(\d){1,2}/)||[];
					if(!m.length || +m[0]>31 || !+m[0] || m[0].length>1&&+m[0]<10) return false;
					dateStr = dateStr.substr(m[0].length);
					break;
				case "G":
					var m = dateStr.match(/^(\d){1,2}/)||[];
					if(!m.length || +m[0]>23 || m[0].length>1&&+m[0]<10) return false;
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
					for(var n=0; n<Date.DAYS.length; n++){
						if(!d.indexOf(Date.DAYS[n].toLowerCase())){
							day = Date.DAYS[n];
							break;
						}
					}
					if(!day) return false;
					dateStr = dateStr.substr(day.length);
					break;
				case "D":
					var d = dateStr.toLowerCase(), abrlen = 0;
					for(var n=0; n<Date.DAYS.length; n++){
						if(Date.DAYS[n].length>6 && !d.indexOf(Date.DAYS[n].toLowerCase().substr(0,6))){
							abrlen = 6; break;
						}
						if(!d.indexOf(Date.DAYS[n].toLowerCase().substr(0,5))){
							abrlen = 5; break;
						}
						if(!d.indexOf(Date.DAYS[n].toLowerCase().substr(0,4))){
							abrlen = 4; break;
						}
						if(!d.indexOf(Date.DAYS[n].toLowerCase().substr(0,3))){
							abrlen = 3; break;
						}
					}
					if(!abrlen) return false;
					dateStr = dateStr.substr(abrlen);
					break;
				case "F":
					var m = dateStr.toLowerCase(), mm=false;
					for(var n=0; n<Date.MONTHS.length; n++){
						if(!m.indexOf(Date.MONTHS[n].toLowerCase())){
							mm = Date.MONTHS[n];
							break;
						}
					}
					if(!mm) return false;
					dateStr = dateStr.substr(mm.length);
					break;
				case "M":
					var m = dateStr.toLowerCase(), mm=false;
					for(var n=0; n<Date.MONTHS.length; n++){
						if(!m.indexOf(Date.MONTHS[n].toLowerCase().substr(0,3))){
							mm = Date.MONTHS[n];
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
		return true;
	};
})();

/**
 * Creates a new Date object from the given string
 * @returns {Date|false}
 */
(function(){
	"use strict";
	Date.prototype.parse = function(dateStr, formatStr){
		if(!Date.validateFormat(dateStr, formatStr)) return false;
		var year = new Date().getFullYear(), 
			month = 0, day = 1, hours = 0, 
			minutes = 0, seconds = 0, milliseconds = 0,
			am=true, hr24=false;
		for(var i=0; i<formatStr.length; i++){
			switch(formatStr[i]){
				case "\\": dateStr = dateStr.substr(2); i++; break;
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
					for(var n=0; n<Date.DAYS.length; n++){
						dd = Date.DAYS[n];
						if(!d.indexOf(dd.toLowerCase())) break;
					}
					dateStr = dateStr.substr(dd.length);
					break;
				case "D":
					var d = dateStr.toLowerCase(), abrlen = 0;
					for(var n=0; n<Date.DAYS.length; n++){
						if(Date.DAYS[n].length>6 && !d.indexOf(Date.DAYS[n].toLowerCase().substr(0,6))){
							abrlen = 6; break;
						}
						if(!d.indexOf(Date.DAYS[n].toLowerCase().substr(0,5))){
							abrlen = 5; break;
						}
						if(!d.indexOf(Date.DAYS[n].toLowerCase().substr(0,4))){
							abrlen = 4; break;
						}
						if(!d.indexOf(Date.DAYS[n].toLowerCase().substr(0,3))){
							abrlen = 3; break;
						}
					}
					dateStr = dateStr.substr(abrlen);
					break;
				case "F":
					var m = dateStr.toLowerCase(), mm=false, idx=0;
					for(var n=0; n<Date.MONTHS.length; n++){
						if(!m.indexOf(Date.MONTHS[n].toLowerCase())){
							mm = Date.MONTHS[n];
							idx = n;
							break;
						}
					}
					month = idx;
					dateStr = dateStr.substr(mm.length);
					break;
				case "M":
					var m = dateStr.toLowerCase(), mm=false, idx =0;
					for(var n=0; n<Date.MONTHS.length; n++){
						if(!m.indexOf(Date.MONTHS[n].toLowerCase().substr(0,3))){
							mm = Date.MONTHS[n];
							break;
						}
					}
					month = idx;
					dateStr = dateStr.substr(3);
					break;
				case "S":
					if(!~['st','nd','rd','th'].indexOf(dateStr.toLowerCase().substr(0,2))) return false;
					dateStr = dateStr.substr(2);
					break;
				default: dateStr = dateStr.substr(1); break;
			}
		}
		if(!am && !hr24) hours+=12;
		return new Date(year, month, day, hours, minutes, seconds, milliseconds);
	};
})();

if(!!(typeof module !== 'undefined' && module.exports)) module.exports = Date;