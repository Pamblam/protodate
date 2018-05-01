
var expect = require('chai').expect;
const Date = require('../protodate.tz.full.js');
process.env.TZ = 'iso3166.tab';

describe('Validator tests', function (){
	it('Should validate', function(){
		expect(Date.validateFormat("Fri 12/5/99 4:30:24.090 pm", "D m/j/y g:i:s.v a")).to.be.true;
	});
	it('Should validate', function(){
		expect(Date.validateFormat("Friday 12/5/2007 04:30:24.090 pm", "l m/j/Y H:i:s.v a")).to.be.true;
	});
	it('Should validate', function(){
		expect(Date.validateFormat("Wedn YEP 6/05/2007 4:30:24.090 pm", "D \\YEP n/d/Y G:i:s.v a")).to.be.true;
	});
	it('Should validate', function(){
		expect(Date.validateFormat("Wedne January 05/2007 4:30:24.090 pm", "D F d/Y G:i:s.v a")).to.be.true;
	});
	it('Should validate', function(){
		expect(Date.validateFormat("Wednes Jan 5th 2007 04:30:24 pm", "D M jS Y h:i:s a")).to.be.true;
	});
	
	it('Should not validate', function(){
		expect(Date.validateFormat("1 12/5/99 4:30:24.090 pm", "D m/j/y g:i:s.v a")).to.be.false;
	});
	it('Should not validate', function(){
		expect(Date.validateFormat("Friday s/5/2007 04:30:24.090 pm", "l m/j/Y H:i:s.v a")).to.be.false;
	});
	it('Should not validate', function(){
		expect(Date.validateFormat("Wedn YEP 6/r/2007 4:30:24.090 pm", "D \\YEP n/d/Y G:i:s.v")).to.be.false;
	});
	it('Should not validate', function(){
		expect(Date.validateFormat("Wedne January 05/5 4:30:24.090 pm", "D F d/Y G:i:s.v")).to.be.false;
	});
	it('Should not validate', function(){
		expect(Date.validateFormat("Wednes Jan 5th 2007 y:30:24 pm", "D M jS Y h:i:s")).to.be.false;
	});
	
});
describe('Parser tests', function (){
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("Fri 12/5/99 4:30:24.090 pm", "D m/j/y g:i:s.v a"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("Friday 12/5/2007 04:30:24.090 pm", "l m/j/Y H:i:s.v a"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("Wedn YEP 6/05/2007 4:30:24.090 pm", "D \\YEP n/d/Y G:i:s.v a"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("Wedne January 05/2007 4:30:24.090 pm", "D F d/Y G:i:s.v a"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("Wednes Jan 5th 2007 04:30:24 pm", "D M jS Y h:i:s a"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("Wednes Jan 5th 2007 04:30:24 am", "D M jS Y h:i:s a"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("01", "y"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("12", "g"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("12", "h"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse('Nov', 'M'))).to.be.true;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("12", "S"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("\\Y", "\\F"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("F", "y"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("F", "n"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "j"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "G"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "H"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "i"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "v"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "a"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "l"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "F"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "M"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("j", "S"))).to.be.false;
	});
	it('Should not parse', function(){
		expect(Date.isDate(Date.parse("1", "2"))).to.be.false;
	});
});
describe('Formatter tests', function (){
	var d = new Date(2007,5,11,13,54,5,123); // Mon 06/11/07 1:54:05.123 pm
	it('Should format', function(){
		expect(d.format("D m/j/y g:i:s.v a")=="Mon 06/11/07 1:54:05.123 pm").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("l m/j/Y H:i:s.v a")=="Monday 06/11/2007 13:54:05.123 pm").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("D \\YEP n/d/Y G:i:s.v")=="Mon YEP 6/11/2007 13:54:05.123").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("D F d/Y G:i:s.v")=="Mon June 11/2007 13:54:05.123").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("D M jS Y h:i:s")=="Mon Jun 11th 2007 01:54:05").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("t")=="30").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("w")=="1").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("N")=="1").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("L")=="0").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("o")=="2007").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("A")=="PM").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("W z")=="24 162").to.be.true;
	});
	
	it('Should format', function(){
		expect(d.format("B")=="620"||d.format("B")=="829").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("Z")=="0"||d.format("Z")=="18000").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("U")=="1181570045"||d.format("U")=="1181588045").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("c")=="2007-06-11T13:54:05.123Z"||d.format("c")=="2007-06-11T18:54:05.123Z").to.be.true;
	});
	
	it('Should format', function(){
		expect(new Date(2007,5,1,13,54,5,123).format('jS')=="1st").to.be.true;
	});
	it('Should format', function(){
		expect(new Date(2007,5,2,13,54,5,123).format('jS')=="2nd").to.be.true;
	});
	it('Should format', function(){
		expect(new Date(2007,5,3,13,54,5,123).format('jS')=="3rd").to.be.true;
	});
	it('Should format', function(){
		expect(new Date(2007,5,3,2,54,5,123).format('g')=="2").to.be.true;
	});
	it('Should format', function(){
		expect(new Date(2007,5,3,2,54,5,123).format('h')=="02").to.be.true;
	});
	it('Should format', function(){
		expect(new Date(2007,5,3,2,54,5,123).format('N')==7).to.be.true;
	});
	it('Should format', function(){
		expect(new Date(1400,5,3,2,54,5,123).format('L')==0).to.be.true;
	});
	it('Should format', function(){
		expect(new Date(2004,5,3,2,54,5,123).format('L')==1).to.be.true;
	});
	it('Should format', function(){
		expect(new Date(2001,0,1).format('o')==2000).to.be.true;
	});
	it('Should format', function(){
		expect(new Date(2004,5,3,2,54,5,123).format('a A')=="am AM").to.be.true;
	});
	
	it('Should not format', function(){
		expect(new Date('farts').format('jS')).to.be.false;
	});
});
describe('Elapsed tests', function (){
	var d1 = new Date(2007,5,11,13,54,5,123);
	var d2 = new Date(2015,4,10,9,32,2,548);
	var d3 = new Date(2016,5,11,10,33,3,549);
	var d4 = new Date(2015,4,11,9,32,2,548);
	var d5 = new Date(2015,4,10,8,32,2,548);
	it('Should calculate', function(){
		expect(d1.elapsedSince(d2).clock(true)=="19:37:57.425").to.be.true;
	});
	it('Should calculate', function(){
		expect(d2.elapsedSince(d3).verbose()=="1 year, 33 days, 1 hour, 1 minute, and 1 second").to.be.true;
	});
	it('Should calculate', function(){
		expect(d2.elapsedSince(d4).verbose()=="1 day").to.be.true;
	});
	it('Should calculate', function(){
		expect(d2.elapsedSince(d5).verbose()=="1 hour").to.be.true;
	});
	it('Should calculate', function(){
		expect(d1.elapsedSince(d2).clock()=="19:37:57").to.be.true;
	});
	it('Should calculate', function(){
		expect(d1.elapsedSince(d2).verbose()=="7 years, 334 days, 19 hours, 37 minutes, and 57 seconds").to.be.true;
	});
	it('Should not calculate', function(){
		expect(d1.elapsedSince('farts')).to.be.false;
	});
});

describe('Add and Substract tests', function (){
	var d = new Date(2007,5,11,13,54,5,123);
	it('Should add', function(){
		expect(d.plus(3, Date.DAY).format("m/d/y g:i a") == "06/14/07 1:54 pm").to.be.true;
	});
	it('Should substract', function(){
		expect(d.minus(3, Date.DAY).format("m/d/y g:i a") == "06/11/07 1:54 pm").to.be.true;
	});
});

describe('Format Guessing', function (){
	var d = new Date(2007,5,11,13,54,5,123);
	it('Should guess', function(){
		expect(Date.parse("January 2007").format("m/y") == "01/07").to.be.true;
	});
	it('Should guess', function(){
		expect(Date.parse("3 o'clock").format("g") == "3").to.be.true;
	});
	it('Should guess', function(){
		expect(Date.parse("February 21st 1987 3:32 pm").format("m/d/y H:i") == "02/21/87 15:32").to.be.true;
	});
	it('Should guess', function(){
		expect(Date.parse("22:11:13.321 February 21st 1987").format("m/d/y g:i:s.v a") == "02/21/87 10:11:13.321 pm").to.be.true;
	});
	it('Should not guess', function(){
		expect(Date.parse(".")).to.be.false;
	});
});

describe('TS Methods', function (){
	var d = new Date(2007,5,11,13,54,5,123);
	it('Show timestamp', function(){
		// multiple correct possibilities depending on environment
		expect(d.getUnixTimestamp()=="1181570045"||d.getUnixTimestamp()=="1181588045").to.be.true;
	});
	it('Show timezone', function(){
		var z = new Date().getTimezone();
		expect(z=="America/New_York"||z=="UTC").to.be.true;
	});
	it('Check for DST in Timezone', function(){
		expect(Date.isDSTObserved('America/New_York')).to.be.true;
	});
	it('Check for DST in Date', function(){
		var passed = false;
		var tz;
		try{
			tz = new Date().getTimezone()
			passed = new Date().isDST();
		}catch(e){
			passed = tz === 'UTC';
		}
		expect(passed).to.be.true;
	});

	var s = new Date(2007,5,11,13,54,5,123);
	s.setTimezone('Australia/Sydney');

	it('Get time in Sydney, Australia', function(){
		// multiple correct possibilities depending on environment
		expect(s.toString()=='Mon Jun 11 2007 23:54:05 GMT+1000 (AEST)'||s.toString()=="Mon Jun 12 2007 04:54:05 GMT+1000 (AEST)").to.be.true;
	});
	it('Get date in Sydney, Australia', function(){
		expect(s.toDateString()=='Mon Jun 11 2007'||s.toDateString()=='Mon Jun 12 2007').to.be.true;
	});
	it('Get timezone Sydney, Australia', function(){
		expect(s.getTimezone()=='Australia/Sydney').to.be.true;
	});
	it('Should not find timezone', function(){
		var err = false;
		try{
			new Date().setTimezone('Poop');
		}catch(e){
			err = true;
		}
		expect(err).to.be.true;
	});
	it('Should not find timezone', function(){
		var err = false;
		try{
			Date.isDSTObserved('Poop');
		}catch(e){
			err = true;
		}
		expect(err).to.be.true;
	});
	
	var nome = new Date(2007,5,11,13,54,5,123);
	nome.setTimezone('America/Nome');
	it('Should format nome date', function(){
		// multiple correct possibilities depending on environment
		expect(nome.format("m/d/y g:i:s.v a")=='06/11/07 5:54:05.123 am'||nome.format("m/d/y g:i:s.v a")=='06/11/07 10:54:05.123 am').to.be.true;
	});
	it('Should format nome date', function(){
		expect(nome.getMilliseconds()=='0').to.be.true;
	});
	it('Should get nome TZ offset', function(){
		expect(nome.getTimezoneOffset()==-480).to.be.true;
	});
	
	var tahiti = new Date(2007,5,11,13,54,5,123);
	tahiti.setTimezone('Pacific/Tahiti');
	it('Should format tahiti date', function(){
		// multiple correct possibilities depending on environment
		expect(tahiti.toString()=='Mon Jun 11 2007 08:54:05 GMT-1000 (-10)'||tahiti.toString()=='Mon Jun 11 2007 03:54:05 GMT-1000 (-10)').to.be.true;
	});

});