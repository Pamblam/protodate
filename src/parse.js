
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