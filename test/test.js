
var expect = require('chai').expect;
const Date = require('../protodate.js');
process.env.TZ = 'iso3166.tab';

describe('Validator tests', function (){
	it('Should validate', function(){
		expect(Date.validateFormat("Fri 12/5/99 4:30:24.090 pm", "D m/j/y g:i:s.v a")).to.be.true;
	});
	it('Should validate', function(){
		expect(Date.validateFormat("Friday 12/5/2007 04:30:24.090 pm", "l m/j/Y H:i:s.v a")).to.be.true;
	});
	it('Should validate', function(){
		expect(Date.validateFormat("Wedn YEP 6/05/2007 4:30:24.090 pm", "D \\YEP n/d/Y G:i:s.v")).to.be.true;
	});
	it('Should validate', function(){
		expect(Date.validateFormat("Wedne January 05/2007 4:30:24.090 pm", "D F d/Y G:i:s.v")).to.be.true;
	});
	it('Should validate', function(){
		expect(Date.validateFormat("Wednes Jan 5th 2007 04:30:24 pm", "D M jS Y h:i:s")).to.be.true;
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
		expect(Date.isDate(Date.parse("Wedn YEP 6/05/2007 4:30:24.090 pm", "D \\YEP n/d/Y G:i:s.v"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("Wedne January 05/2007 4:30:24.090 pm", "D F d/Y G:i:s.v"))).to.be.true;
	});
	it('Should parse', function(){
		expect(Date.isDate(Date.parse("Wednes Jan 5th 2007 04:30:24 pm", "D M jS Y h:i:s"))).to.be.true;
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
		expect(d.format("B")=="620").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("Z")=="0").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("U")=="1181570045").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("c")=="2007-06-11T13:54:05.123Z").to.be.true;
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