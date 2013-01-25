/*** INCLUDES Y REQUIRES ***/
var events = require('events');
var customEvents = new events.EventEmitter;

function queryStringToArray(querystring) {
	var aReturn = new Array;
	var varSplit = querystring.split("&");
	for(var i = 0; i < varSplit.length; i++) {
		var dataSplit = varSplit[i].split("=");
		aReturn[dataSplit[0]] = dataSplit[1];
	}
	return aReturn;
}

module.exports.queryStringToArray = queryStringToArray;
module.exports.webToolsEvents = customEvents;
