
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