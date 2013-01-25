var http = require('http');
var url = require('url')

var SimpleAdder = function()
{
	this.requestString = "",
	this.requestNum_1 = 0,
	this.requestNum_2 = 0,
	this.resultAdd = 0,
	this.attendRequest = function(request, response)
	{
		this.requestString = url.parse(request.url, true);
		this.queryData = this.requestString.query;
		if(this.queryData.hasOwnProperty('num1'))
		{
			this.requestNum_1 = this.queryData.num1;
		}
		if(this.queryData.hasOwnProperty('num2'))
		{
			this.requestNum_2 = this.queryData.num2;
		}
		
		console.log('' + this.addNumbers());
		response.write('' + this.addNumbers());
		response.end();
	},
	this.addNumbers = function()
	{
		return (parseInt(this.requestNum_1) + parseInt(this.requestNum_2));
	}
};

http.createServer(function (request, response)
{
	var objAttender = new SimpleAdder;
	objAttender.attendRequest(request, response);
	
}).listen(8124);
