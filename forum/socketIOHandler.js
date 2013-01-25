var application = require("./server.js");
var io = require('socket.io').listen(application.application);
var events = require('events');
var customEvents = new events.EventEmitter;

// Si no, van a salir Warnings por consola de tipo posible memory leak...
customEvents.setMaxListeners(0);

io.sockets.on("connection", function(socket) {
	socket.on("readMsgList", function(data) {
				
	});
	socket.on("createMsg", function(data) {
		
	});
	socket.on("deleteMsg", function(data) {
		
	});
	socket.on("updateMsg", function(data) {
		
	});
	socket.on("createPoll", function(data) {
		
	});
	socket.on("deletePoll", function(data) {
		
	});
	socket.on("updatePoll", function(data) {
		
	});	
	socket.on("newVote", function(data) {
		
	});
	socket.on("deleteVote", function(data) {
		
	});
	socket.on("updateVote", function(data) {
		
	});
	
	// TODO: Sistema de gestión de usuarios
});


module.exports.io = io;
