var events = require('events');
var application = require('http').createServer(handlerServer);
var url = require('url');
var fs = require('fs');
var CRUD = require('./lib/animal-crud');
var errorHandler = require('./lib/error-handler');
var toolsUtils = require('../tools/utils');
var clientApp = "";

application.listen(8098);

function handlerServer(request, response) {
  
  var parsedURL = url.parse(request.url, true);
  var path = parsedURL.pathname;
  var argv = parsedURL.query;
  
  /* console.log(path);
  console.log(argv);
  console.log(parsedURL); */
  
  switch(path) {
	  
	  // Debemos ignorar esta petición, así que la ponemos cacheada hasta el fin de los tiempos, mas o menos
	  case "/favicon.ico":
		response.writeHead(200, {'Content-Type': 'image/x-icon', 'Cache-Control': 'max-age=2592000000'} );
		response.end();
		// console.log('favicon requested');
	  break;
	  
	  case "/randomcreate":
		  var names = ["Joya", "Merlin", "Yuri", "Gato", "Zarwich", "Thor", "Odín", "Sisko", "Kira", "Worf"];
		  var races = ["Común", "Siamés", "Alsaciano", "Angora", "Egipcio", "Nordico", "Africano", "Asiático", "Bajorano", "Klingon"];
		  for(var i = 0; i < 100; i++) {
			var randName = names[Math.floor(Math.random()*9)];
			var randRace = races[Math.floor(Math.random()*9)];
			var dataAnimal = {"name" : randName, "race" : randRace};
			var testAnimal = new CRUD.Animal(dataAnimal);
			testAnimal.create();
		  }
	  break;
	  
	  case "/create":
		  var testAnimal = new CRUD.Animal(argv);
		  testAnimal.create();	  
	  break;
	  
	  case "/read":
		  var testAnimal = new CRUD.Animal();
		  testAnimal.read({});
	  break;
	  
	  case "/delete":
		  var testAnimal = new CRUD.Animal();
		  /* var filterDel = {};
		  if(argv instanceof Object) {
			  filterDel = argv;
		  } */
		  testAnimal.delete(argv);
	  break;	  
	  
	  // Esta ruta hay que modificarla para que realmente actualice
	  // los datos del objeto
	  case "/update":
		  var testAnimal = new CRUD.Animal();
		  var dataQuery = {"name" : "Thor"};
		  var dataSet = {"$set" : {"name" : "Thor, the mighty"}};
		  testAnimal.update(dataQuery, dataSet);
	  break;
	  
	  // Estas rutas sirven para testear la integridad de datos para mongoose
	  // Porque como un noSQL admite un schema tan laxo...
	  case "/testfail":		  
		  var dataInsert = {"name" : "TestFail", "race" : "TestFail" , "misc" : "TestFail", "misc2" : "TestFail"};
		  var testAnimal = new CRUD.Animal(dataInsert);
		  testAnimal.create();
	  break;
	  
	  case "/testfail2":	      
		  var dataInsert = {"name" : "TestFail2"};
		  var testAnimal = new CRUD.Animal(dataInsert);		  
		  testAnimal.create();
	  break;
	  
	  case "/testfail3":
		  var dataInsert = {"nsmae" : "TestFail3"};
		  var testAnimal = new CRUD.Animal(dataInsert);
		  testAnimal.create();
	  break;
	  
	  
	  //Si no pides rutas, se te devuelve la aplicación cliente.	  
	  default:		  
		  stream = fs.ReadStream("client.html");
		  stream.setEncoding('ascii');
		  clientApp = "";
		  stream.on('data', function(data) {
			  clientApp += data;			  
		  });
		  stream.on('close', function(data) {
			  response.writeHead(200, {"Content-Type": "text/html"});
			  response.end(clientApp);
		  });
	  break;
  }  
  
  
  // MANEJADORES DE EVENTOS DE LA LIBRERÍA CRUD  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Create:OK", function(data) {
	  response.end(JSON.stringify({"code" : "OK"}));
  });
  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Create:Error", function(data) {
	  data["showableError"] = "Hubo un error creando el documento.";
	  data["errorRAW"] = data;
	  response.end(errorHandler.handler(data));
  });
  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Read:OK", function(data) {
	  response.end(JSON.stringify(data));	  
	  // Fíjate que si no pasas por JSON.stringify(), devuelve todo el objeto...
	  // Analizar por qué es esto	  
	  //console.log(JSON.stringify(data));
	  //console.log(toolsUtils.htmlTable(JSON.stringify(data)));
	  //response.end(toolsUtils.htmlTable(JSON.stringify(data)));
  });
  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Read:Error", function(data) {
	  response.end("ERROR: " + JSON.stringify(data));
  });
  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Delete:OK", function(data) {
	  response.end(JSON.stringify({"code" : "OK"}));
  });
  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Delete:Error", function(data) {
	  response.end("ERROR: " + JSON.stringify(data));
  });
  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Update:Error", function(data) {
	  response.end("ERROR: " + JSON.stringify(data));
  });
  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Update:OK", function(data) {
	  response.end("ACTUALIZADO CORRECTAMENTE");
  });
  
  CRUD.eventManager.on("MongooseTutorial:CRUD:Create:BadSchema", function(data) {
	  response.end("BAD SCHEMA: " + JSON.stringify(data));
  });
         
}
