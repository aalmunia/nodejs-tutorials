var application = require('http').createServer(handleCreateServer);
var url = require('url');
var io = require('socket.io').listen(application);

application.listen(8088);

var responseObject = undefined;
var requestObject = undefined;
var listeningSocket = undefined;
var requestString = undefined;

function handleMySQLQuery (query)
{
	console.log(query);	
	
	//var sqlToExec = (requestString.query["sqlExec"] == undefined) ? "SELECT * FROM ZF_OrderR4_2 LIMIT 0, 100" : requestString.query["sqlExec"];
	var sqlExec = (query == undefined) ? "SELECT * FROM ZF_OrderR4_2 LIMIT 0, 10" : query["sqlExec"];
	var databaseConnect = (query == undefined) ? "information_schema" : query["databaseConnect"];	
	
	var Client = require('mysql').Client,
		client = new Client();
		client.user = 'root';
		client.password = '1234';
		client.host='127.0.0.1';
		client.port='3306';
		client.database=databaseConnect;
		
	    client.query(sqlExec, function(err, results, fields){
			//var resJSON = JSON.stringify(results);
			listeningSocket.emit('newMySQLResult', results);
			//console.log(results);
			//console.log(resJSON);
		});
	    return client.end();
}

function handleCreateServer (req, res)
{
	responseObject = res;
	requestObject = req;	
	requestString = url.parse(requestObject.url, true);
}

//Siempre es onConnection porque aquí se definen los handlers de los distintos eventos
io.sockets.on('connection', function(socket){
	listeningSocket = socket;
	socket.on('newMySQLQuery', handleMySQLQuery);
});
