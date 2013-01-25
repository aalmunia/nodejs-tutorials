var http = require('http');
var url = require('url');

//Parece ser que merece la pena dejar estos dos objetos como globales a todo
//el servicio. Lo interesante sería crear clases que tengan métodos
//de respuesta, de tal forma que los objetos de request y response
//siempre estén vivos en el contexto.

//O dejar la OOP de lado y hacerlo funcional puro...

var responseObject = undefined;
var requestObject = undefined;

/**
 * Here we create the node.js http server and we delegate
 * the handling of the requests in the objResponse object.
 * Said object has the methods required for the response
 * to be correct and understandable by the service consumer.
 */
 
var handleResults = function(err, results, fields)
{
	if(err)
	{
		console.log("HUBO UN ERROR EN EL HANDLER");
		//@TODO: Escribir el mensaje de error al consumidor de servicios JSON
		var responseData = err;		
	}
	else
	{
		var responseData = results;		
	}
	responseObject.writeHead(200, {'Content-Type': 'text/plain'});
	responseObject.end('nodeCallback(' + (JSON.stringify(responseData)) + ')');
}
 
http.createServer(function (req, res)
{
	responseObject = res;
	requestObject = req;
	var requestString = url.parse(requestObject.url, true);
	
	var sqlToExec = (requestString.query["sqlExec"] == undefined) ? "SELECT * FROM ZF_OrderR4_2 LIMIT 0, 100" : requestString.query["sqlExec"];
	
	var Client = require('mysql').Client,
		client = new Client();
		client.user = 'root';
		client.password = '1234';
		client.host='127.0.0.1';
		client.port='3306';
		client.database='renta4test';
		
		//Necesita un handler para procesar los datos que obtiene, se declara previamente.
		//Cuidado con this. en estos handlers, recuerda el ámbito es local, y eso sería
		//desastroso en este contexto. (this) sería la función handler, si se usa dentro
		//de la misma.				
	    client.query(sqlToExec, handleResults);
	    client.end();
	   
}).listen(8224);
