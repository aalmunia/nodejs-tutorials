/*** INCLUDES Y REQUIRES ***/
var events = require('events');
var application = require('http').createServer(handlerServer);
var url = require('url');
var socketio = require("./socketIOHandler.js");
var fs = require('fs');
var querystring = require('querystring');
var webTools = require("../libs/webTools.js");
var MessageCRUD = require("./messageCRUD.js");

/*** VARIABLES GLOBALES A TODA LA APLICACIÓN ***/
var usersConnected = [];
var nUsers = 0;

/*** INICIALIZAMOS LA APLICACIÓN (SERVIDOR) ***/
application.listen(9990);


/*** LEEMOS, SOLO UNA VEZ, EL FORMULARIO DE AUTENTIFICACIÓN ***/
/*** TODO: Modificar y a ser posible, encapsular este método ***/
var authForm = "";
streamAuthForm = fs.ReadStream("auth.html");
streamAuthForm.setEncoding("ascii");
streamAuthForm.on("data", function(data) {
authForm += data;
});
streamAuthForm.on("close", function() {
  console.log("Terminado de leer el formulario de autentificación");
});


/*** MANEJADOR DEL SERVIDOR ***/
function handlerServer(request, response) {
  
  var parsedURL = url.parse(request.url, true);
  var path = parsedURL.pathname;
  var argv = parsedURL.query;
  var requestMethod = request.method;  
  
  /* console.log(path);
  console.log(argv);
  console.log(parsedURL);
  console.log(request.method); */
  
  /*** PATH FRONT CONTROLLER ***/
  switch(path) {
	  
	  case "/favicon.ico":
		response.writeHead(200, {"Content-Type": "image/x-icon", "Cache-Control": "max-age=2592000000"} );
		response.end();
		console.log("favicon requested");
	  break;
	  
	  case "/getusers":
		response.writeHead(200, {"Content-Type" : "application/json"} );
		response.write(JSON.stringify(usersConnected));
		response.end();		
	  break;
	  
	  case "/makefixtures":
		// Crear 100 mensajes de distintos usuarios
		// var msgTitles = ["Mensaje1", "Mensaje2"
		var msgTitles = [];
		var users = [];
		var txtMsgs = [];
		
		for(var i = 0; i < 100; i++) {
			msgTitles[i] = "Mensaje_" + i;
			users[i] = "Usuario_" + i;
			txtMsgs[i] = "Esto es un texto, perteneciente al mensaje " + i;			
		}
	  break;
	  
	  default:
		if(requestMethod == "GET") {			
			response.writeHead(200, {"Content-Type" : "text/html"} );
			response.write(authForm);
			response.end();
		} else if(requestMethod == "POST") {			
			var rawData = "";		
			request.on("data", function(data) {
				rawData += data;								
			});			
			request.on("end", function() {
				var userData = webTools.queryStringToArray(rawData);
				usersConnected[nUsers] = {};
				usersConnected[nUsers].userName = userData.userName;
				usersConnected[nUsers].pass = userData.userName;
				nUsers++;
				response.end("At this point, i would give you the app");
			});			
		} else {
			responseWriteHead(404, {"Content-Type" : "text/html" });
			response.write("<html><head></head><body>How the hell did you get in here? Get the f*** out !!!!</body></html>");
			response.end();			
		}		
	  break;	  
  }  
}

/*** EXPORTAMOS PARA PODER DISTRIBUIR LA APLICACIÓN EN DIFERENTES MÓDULOS / SCRIPTS ***/
module.exports.application = application;
