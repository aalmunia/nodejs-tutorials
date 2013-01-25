var http = require('http');
var url = require('url');

var TheCalculator = function()
{
	this.operand_1 = 0,
	this.operand_2 = 1,
	this.actualOp = "",
	this.attendRequest = function(request, response)
	{
		this.requestString = url.parse(request.url, true);
		this.queryData = this.requestString.query;
		if(this.queryData.hasOwnProperty('num1'))
		{
			this.operand_1 = parseInt(this.queryData.num1);
		}
		if(this.queryData.hasOwnProperty('num2'))
		{
			this.operand_2 = parseInt(this.queryData.num2);
		}
		if(this.queryData.hasOwnProperty("operation"))
		{
			var opNew = this.queryData.operation + "Numbers";
			
			console.log(this.queryData);
			console.log(this.operand_1);
			console.log(this.operand_2);
			console.log(opNew);
			console.log("this." + opNew + "()");
			
			if(this.hasOwnProperty(opNew))
			{
				response.end('\nRESULTADO FINAL CALCULADORA: ' + eval("this." + opNew + "()") + '\n');
			}
			else
			{
				response.end('\nRESULTADO FINAL CALCULADORA: ' + this.addNumbers() + '\n');
			}
		}
	},
	this.addNumbers = function()
	{
		return (this.operand_1 + this.operand_2);
	},
	this.substractNumbers = function()
	{
		return (this.operand_1 - this.operand_2);		
	},
	this.multiplyNumbers = function()
	{
		return (this.operand_1 * this.operand_2);		
	},
	this.divideNumbers = function()
	{
		return (this.operand_1 / this.operand_2);		
	}				
};

http.createServer(function (request, response)
{
	var objCalc = new TheCalculator;
	objCalc.attendRequest(request, response);
	
}).listen(8889);
