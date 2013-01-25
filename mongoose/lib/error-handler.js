var dataDumper = require('../../tools/utils');

function handleError(errData) {
	var html = "<html><head><title>:: node.js error page ::</title></head>";
	html += "<body><h1>ERROR</h1><br/>";	
	html += dataDumper.dump(errData);
	html += "</body></html>";
	return html;
}

module.exports.handler = handleError;
