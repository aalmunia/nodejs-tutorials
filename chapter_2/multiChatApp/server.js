var chatMultiApp = require('http').createServer(handleMultiChat);
var url = require('url');
var io = require('socket.io').listen(chatMultiApp);

chatMultiApp.listen(8056);

var clientsConnected = [];
var nConnected = 0;

function newMsg(data)
{
	if(data.type == 'PRIVATE')
	{
		// Mensaje privado solo para un usuario... Interesante como mandar eso por el socket si hay mas
		// de un usuario conectado...		
	}
	else
	{
		// Mensaje público que debe ser 'broadcasted' a todos los usuarios		
	}	
}

function handleMultiChat(request, response)
{
	
}

/**
 * Vamos a definir la estrcutura de datos que recibimos.
 * Recuerda: Debe estar autentificada o se puede 'fakear'
 * 
 * var dataStruct = {'type', : GENERAL | PRIVATE, 
 * 					 'operation' : NEW_MSG, DISCONNECT,
 * 					 'msg': MESSAGE_TEXT,
 * 					 'private' : 
 * 								  {'from' : USER_NAME,
 * 								   'to' : USER_NAME }
 * 					};
 * 
 **/

function clientIsConnected(key, aKeys)
{
	var returnCode = false;
	
	for(var clave in aKeys)
	{
		if(clave === key)
		{
			returnCode = true;
		}
	}
	
	return returnCode;
}

io.sockets.on('connection', function(socket, data) {
		
	var encoded = new Buffer(socket.id).toString('base64');
	var unencoded = new Buffer(encoded || '' , 'base64').toString('utf8');
	
	clientsConnected[encoded] = true;
	nConnected++;
	
	socket.emit('authData', {"authCookie" : encoded});
	
	socket.on('msg', function(data) {
		
		// Debemos enviar la cookie de autentificación, así que...
		if(!data.hasOwnProperty('authCode'))
		{
			console.log('A TOMAR POR SACO, NO ME MANDA LA COOKIE, ME MANDA NADA MAS QUE ESTO: ');
			console.log(data);
		}
		else
		{
			if(clientIsConnected(data.authCode, clientsConnected))
			{
				console.log(data.authCode);
				console.log(data.msg);
			}
			else
			{
				console.log('ESTE CLIENTE NO ESTÁ DENTRO DEL LISTADO DE CLIENTES CONECTADOS');								
			}
		}		
	});
});
