
(function(){
	"use strict";
	Date.MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	Date.DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	Date.PROTODATE_VERSION = '{{ VERSION }}';
	Date.MILLISECOND = 1;
	Date.SECOND = 1000;
	Date.MINUTE = 60000;
	Date.HOUR = 3600000;
	Date.DAY = 86400000;
	Date.YEAR = 31536000000;
	Date.TIME_FORMATS = [
		"G00 \\h\\o\\u\\r\\s", "g \\o\\c\\l\\o\\c\\k", "g \\o \\c\\l\\o\\c\\k", 
		"g i", "g i a", "g i A", "g i s", "g i s a", "g i s A", "h i", "h i a", 
		"h i A", "h i s", "h i s a", "h i s A", "H i", "H i a", "H i A", "H i s", 
		"G i", "G i a", "G i A", "G i s"
	];
	Date.DATE_FORMATS = [
		"y", "Y", "F", "M", "F Y", "F y", "M Y", "M y",
		"F jS Y", "F jS", "M jS Y", "M jS", "F j Y", "F j", "M j Y", "M j",
		"jS F Y", "jS F", "jS M Y", "jS M", "j F Y", "j F", "j M Y", "j M",
		"Y m d", "m d y", "m d Y", "Y n d", "n d y", "n d Y", "Y m j", "m j y", "m j Y", "Y n j", "n j y", "n j Y",
		"D Y m d", "D m d y", "D m d Y", "D Y n d", "D n d y", "D n d Y", "D Y m j", "D m j y", "D m j Y", "D Y n j", "D n j y", "D n j Y",
		"l Y m d", "l m d y", "l m d Y", "l Y n d", "l n d y", "l n d Y", "l Y m j", "l m j y", "l m j Y", "l Y n j", "l n j y", "l n j Y"
	];
})();