
var expect = require('chai').expect;
const Date = require('../protodate.js');

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
		expect(d.format("B")=="787").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("Z")=="14400").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("U")=="1181584445").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("A")=="PM").to.be.true;
	});
	it('Should format', function(){
		expect(d.format("W z")=="24 162").to.be.true;
	});
});