var application = require('http').createServer(handlerServer);
var url = require('url');
var io = require('socket.io').listen(application);

var requestObject = undefined;
var responseObject = undefined;

application.listen(8045);

function chatHandle(socket, data)
{	
	var dataSend = {};
	dataSend.message = "<b>" + data["userName"] + "</b>: " + data["message"];
	
	//Este es para el socket que hace la conexión
	socket.emit('newChatMessageFromServer', dataSend);	
	
	//Recuerda que la estructura de datos enviada al consumidor es del tipo:
	//{"name": [NOMBRE_DE_EVENTO], "args": [OBJETO_JSON_CON_DATOS]}
}

//En este caso, dado que la aplicación es un respondedor de eventos
//el servidor en si no tiene mucho que hacer, es el objeto de socket
//el que hace el trabajo en esta aplicación
function handlerServer(req, res)
{
	requestObject = req;
	responseObject = res;
	var requestString = url.parse(requestObject.url, true);
}

//Esta sección del código es donde se hace el trabajo real, se definen
//los handlers para los diferentes eventos que se plantean en el 
//contexto de la aplicación
io.sockets.on('connection', function(socket){
	
	console.log('SOCKET ID: ' + socket.id);
	console.log('SOCKET SESSIONID: ' + socket.sessionid);
	
	//No recomiendo escribir el handler aquí dentro, es menos mantenible
	socket.on('newChatMessageToServer', function(data){
		chatHandle(socket, data);
	});
	
	//En este caso si, porque lo que hace no es casi nada
	socket.on('closeChatConnection', function(){
		console.log("AHORA CERRAMOS...");
		socket.disconnect();		
	});
});
