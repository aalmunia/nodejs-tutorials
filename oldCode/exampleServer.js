var http = require('http');
var url = require('url');

/**
 * This object will eventually become the basis for all the RPC function model.
 * Given the fact that JAPOOF works in a module-based way, it needs to be
 * named by its identifier (more on this later, full PHP namespace most likely)
 */
var objResponse = function()
{
	this.requestString = "",
	this.requestAction = "",
	this.requestObject = "",
	this.responseObject = "",
	this.responseData = "",
	/**
	 * With this method we attend any request that comes to the object.
	 * Serves as front-controller for the handling of actions
	 */	
	this.attendRequest = function(request, response)
	{
		this.requestString = url.parse(request.url, true);
		this.responseData = { };
		var actionExecute = this.requestString.query["action"] + "Action";

		if(request != undefined)
		{
			this.requestObject = request;			
		}
		else
		{
			throw "No http request to fulfill";			
		}
		
		if(response != undefined)
		{
			this.responseObject = response;
		}
		else
		{
			throw "No http object for response";			
		}
		
		if(!this.requestString.query.hasOwnProperty("action"))
		{
			this.errorRequestAction("No action for execution, sorry...");
		}
		else
		{			
			if(this.hasOwnProperty(actionExecute))
			{
				//CURRIFICACIÓN DE FUNCIONES .curry()				
				var methodExecute = "this." + this.requestString.query["action"] + "Action("+JSON.stringify(this.requestString.query)+");";
				console.log(methodExecute);
				eval(methodExecute);
			}
			else
			{
				this.errorRequestAction("NO SUCH ACTION: " + actionExecute);				
			}
		}	
	},
	/**
	 * This action SHOULD NOT BE here, as only the error (as in no correct action selected)
	 * should be in the prototype of the class.
	 */
	this.sieveOfErathostenesAction = function(params)
	{
		this.beginResponse();
		this.responseData["responseType"] = "OK";
		this.responseData["responseMessage"] = "";
		if(params["upToSieve"])
		{
			//this.responseData["responseMessage"] = this.efficientSieve(params["upToSieve"]);
			this.responseData["responseMessage"] = this.sieveOfErathostenes(params["upToSieve"]);
		}
		else
		{
			//this.responseData["responseMessage"] = this.efficientSieve(10000);
			this.responseData["responseMessage"] = this.sieveOfErathostenes(10000);
		}		
		
		this.endResponse();
	},
	this.sieveOfErathostenes = function(max)
	{
		var aTemp = [];
		var aResults = [];
		
		for(var i = 0; i < max; i++)
		{
			aTemp[i] = i;		
		}
		
		//Está construído, ahora a iterarlo para quitar los no primos
		for(var i = 0; i < max; i++)
		{
			if(i <= 1)
			{
				aTemp[j] = -1;
			}
			
			if(i > 1)
			{
				for(var j = (i*i); j < max; j += i)
				{
					aTemp[j] = -1;					
				}
			}
		}
		
		var nPrimes = 0;
		//Y ahora, a filtrarlo para quedarnos solo con los primos
		for(var i = 0; i < max; i++)
		{
			if(aTemp[i] != -1)
			{
				aResults[nPrimes] = aTemp[i];
				nPrimes++;
			}
		}
		
		return aResults;		
	},
	/**
	 * This method is used to inform the service consumer that the action requested
	 * does not exist within the module backend handler.
	 */
	this.errorRequestAction = function(txtError)
	{
		this.beginResponse();
		this.responseData["responseType"] = "KO";
		this.responseData["responseMessage"] = "No action to execute, sorry...";
		this.endResponse();
	},
	/**
	 * This method is a little helper to begin writing the response to
	 * the service consumer.
	 */
	this.beginResponse = function(httpCode)
	{
		if(httpCode == undefined)
		{
			httpCode = 200;
		}
		this.responseObject.writeHead(httpCode, {'Content-Type': 'text/plain'});
	},
	/**
	 * This method codifies the response data that we have specified as JSON
	 * and send it to the server.
	 * CAVEAT: This method should always be the last one to be called, all
	 * creation of the structure this.responseData should be in other methods.
	 */
	this.endResponse = function(callbackName)
	{
		if(callbackName == undefined)
		{
			callbackName = 'nodeCallback';
		}
		this.responseObject.end(callbackName + '(' + (JSON.stringify(this.responseData)) + ')');
	}
};

/**
 * Here we create the node.js http server and we delegate
 * the handling of the requests in the objResponse object.
 * Said object has the methods required for the response
 * to be correct and understandable by the service consumer.
 */
http.createServer(function (req, res)
{	
	var objAttender = new objResponse;	
	objAttender.attendRequest(req, res);
}).listen(8124);
