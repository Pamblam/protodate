
class ProtoDate extends Date{}

(function(){
	"use strict";
	ProtoDate.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	ProtoDate.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	ProtoDate.PROTODATE_VERSION = '{{ VERSION }}';
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