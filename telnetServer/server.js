var net = require('net');
var server = net.createServer();
var toolsUtils = require('../tools/utils');
var sys = require('sys');
var exec = require('child_process').exec;
var events = require('events');
var customEvents = new events.EventEmitter;
var availableCommands = new Array;

function sysOutput(error, stdout, stderr) {
	customEvents.emit("CommandData", stdout);
}

// Comentario test

function putsMessage(conn, message) {
	conn.write(message + "\n");
}

function parseInput(inputBuffer) {
	var pieces = inputBuffer.toString().trim().split(' ');	
	var objInput = {};
	objInput.command = pieces[0];
	objInput.args = pieces.slice(1, pieces.length);
	return objInput;	
}

function getAvailableSystemCommands(eventManager) {
	try {
		exec("bash -c 'compgen -ac'", function(error, stdout, stderr) {			
			eventManager.emit("CommandList", stdout);			
		});
	} catch (e) {
		console.log(e);
		storeCommands = [];
		console.log("No compgen utility, sorry... ");		
	}
}

getAvailableSystemCommands(customEvents);

// conn es un objeto de tipo net.socket, este es el que se usa para
// transferir información al cliente
server.on('connection', function(conn) {    

	conn.on('data', function(data) {		
		var procData = parseInput(data);
		
		switch(procData.command) {
			
			case "COMMAND_LIST":
				putsMessage(conn, JSON.stringify(availableCommands));
			break;
			
			case "HELLO":				
				putsMessage(conn, "HELLO TO YOU TOO");
			break;
			
			case "LIST":
				if(procData.args.length == 0) {
					exec("ls -la", sysOutput);
				} else {
					exec("ls -la " + procData.args[0], sysOutput);
				}
			break;
			
			case "INFO":
				exec("whoami", sysOutput);
			break;
			
			case "CLOSE":
				putsMessage(conn, "GOODBYE");
				conn.end();
				conn.destroy();
			break;
			
			default:				
				if(availableCommands.indexOf(procData.command) != -1) {
					var execute = procData.command + " " + procData.args.join(' ');
					exec(execute, sysOutput);
				} else {
					putsMessage(conn, "COMMAND NOT AVAILABLE");
				}
			break;
		}
		
	});
	
	customEvents.on("CommandData", function(data) {  
		conn.write(data + "\n");
	});
});

customEvents.on("CommandList", function(data) {	
	availableCommands = data.split('\n');	
});

server.listen(8989);
