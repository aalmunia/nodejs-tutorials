var application = require('http').createServer(handlerServer);
var url = require('url');

application.listen(9980);

function handlerServer(request, response) {

	var parsedURL = url.parse(request.url, true);
	var path = parsedURL.pathname;
	var argv = parsedURL.query;
	
	switch(path) {
		
		case "/test":
			var objJSON = {"test" : [{"data" : "Cosa", "data2" : "Mesa"}, {"data" : "Cosá2", "data2" : "Mesa2"}, {"dox" : "nox", "tex" : "mex"}]};
			response.writeHead("Content-type: applicaction/json; charset=utf-8");
			response.end(JSON.stringify(objJSON));
		break;
		
		default:
			response.writeHead("Content-type: text/html; charset=utf-8");
			response.end("TESTEANDO APLICACIÓN...");
		break;
		
	}
}
