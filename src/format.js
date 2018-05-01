
/**
 * Format a date
 * @param {Date} date - A Javascript Date object
 * @param {String} format - The format of the outputted date
 * @returns {String} - The formatted date
 */
(function(){
	"use strict";
	Date.prototype.format = function(format) {
		if (!Date.isDate(this)) return false;
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
				case "t": buffer.push("" + new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate()); break; 
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
				case "l": buffer.push(Date.DAYS[this.getDay()]); break;
				case "D": buffer.push(Date.DAYS[this.getDay()].substr(0, 3)); break;
				case "F": buffer.push(Date.MONTHS[this.getMonth()]); break;
				case "M": buffer.push(Date.MONTHS[this.getMonth()].substring(0, 3)); break;
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
					var startDate = new Date(this.getFullYear(), 0);
					var endDate = new Date(this.getFullYear(), this.getMonth(), this.getDate());
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
					var startDate = new Date(this.getFullYear(), 0, 1, 0, 0, 0, 0);
					var dayNo = 0;
					while(startDate.getTime() < this.getTime()){
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