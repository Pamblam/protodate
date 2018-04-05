
var expect = require('chai').expect;
const Date = require('../protodate.js');

describe('Parser tests', function (){
	it('Should validate', function(){
		expect(Date.validateFormat("12/5/99 4:30:24.090 pm", "m/j/y g:i:s.v a")).to.be.true;
	});
});