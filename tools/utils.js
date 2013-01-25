function dumpVar(varToDump) {
	var html = "";
	if(typeof(varToDump) == "object") {
		html = "<table>";
		for(var prop in varToDump) {			
			if(typeof(varToDump[prop]) == "object") {
				html += dumpVar(prop);
			} else {
				html += "<tr><td><b>" + prop + "</b></td><td>" + varToDump[prop] + "</td></tr>";				
			}
		}
		html += "</table>";		
	} else {
		html += "<table><tr><td>" + varToDump + "</td></tr></table>";
	}
	return html;
}

function reflectFunctions(objectReflect) {
	var methods = Array();
	var nMethods = 0;
	
	for(var prop in objectReflect) {
		if(typeof(objectReflect[prop]) == "function") {
			methods[nMethods] = prop;
			nMethods++;			
		}
	}
	return methods;
}

function makeObjectReflection(objectReflect) {
		
}

function htmlTable(dataRAW, structDefine) {
	
	//@TODO: Analizar esto de aquí... no me mola nada lo que está pasando con este tema...
	var data = JSON.parse(dataRAW);
	
	if(data.length > 0) {
	
		var html = "<table ";
		if(structDefine) {
			if(structDefine.hasOwnProperty("id")) {
				html += " id='"+structDefine.id+"'";
			}
			if(structDefine.hasOwnProperty("cssClass")) {
				html += " class='"+structDefine.cssClass+"'";
			}
		}
		html += ">";
		var aProps = [];
		var i = 0;
		
		for(var prop in data[0]) {
			aProps[i] = prop;
			i++;
		}
		
		for(var j = 0; j < data.length; j++) {
			html += "<tr>";			
			for(var k = 0; k < aProps.length; k++) {
				html += "<td>" + data[j][aProps[k]] + "</td>";			
			}
			html += "</tr>";
		}
		html += "</table>";
	} else {
		html += "<h1>NO DATA</h1>";
	}
	
	return html;
}

module.exports.dump = dumpVar;
module.exports.reflectFunctions = reflectFunctions;
module.exports.htmlTable = htmlTable;
