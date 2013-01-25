//@TODO: Fíjate que estás replicando la MISMA estructura de código fuente
//siempre. Esto se presta muy bien al prototipado y paso a algún modelo
//reutilizable.

var application = require('http').createServer(handleCreateServer);
var io = require('socket.io').listen(application);
var url = require('url');

application.listen(8086);

var responseObject = undefined;
var requestObject = undefined;
var listeningSocket = undefined;
var requestString = undefined;

function sieveOfErathostenes(max)
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
}

function handleSieveRequest(data)
{
	//console.log(data);
	//console.log(requestString);
	var sieveMax = (data["sieveMax"]) ? data["sieveMax"] : 10000;
	var dataResult = {};
	dataResult.result = sieveOfErathostenes(sieveMax);
	listeningSocket.emit('newSieveResult', dataResult);
}

function handleCreateServer(req, res)
{
	requestObject = req;
	responseObject = res;
	requestString = url.parse(requestObject.url, true);
}

io.sockets.on('connection', function(socket){
	listeningSocket = socket;
	socket.on('newSieveRequest', handleSieveRequest);
});
