var mongoose = require("mongoose");
var db = mongoose.connect("localhost", "nodejsForum");
var events = require('events');
var customEvents = new events.EventEmitter;

// Si no, van a salir Warnings por consola de tipo posible memory leak...
customEvents.setMaxListeners(0);

var messageSchema = mongoose.Schema({
	title : {type: String, required: true},
	user: {type: String, required: true},
	text : {type: String , required: true}, 
	children : {type: Array, required : false}}
{strict: true});

messageSchema.methods.create = function() {
	this.save(function(err) {
		if(err) {
			customEvents.emit("NodeJSForum:Message:CRUD:Create:Error", err);
		} else {
			customEvents.emit("NodeJSForum:Message:CRUD:Create:OK");			
		}
	});
});

messageSchema.methods.read = function(eventsObject) {
	Message.find(dataFilter, function(err, results, more) {
		if(err) {
			customEvents.emit("NodeJSForum:Message:CRUD:Read:Error", err);						
		} else {
			customEvents.emit("NodeJSForum:Message:CRUD:Read:OK", results);	
		}
	});
});

messageSchema.methods.update = function(query, update, options, multi) {
	Message.update(query, update, options, function(err) {
		if(err) {
			customEvents.emit("NodeJSForum:Message:CRUD:Update:Error", err);
		} else {
			customEvents.emit("NodeJSForum:Message:CRUD:Update:OK");
		}
	});
});

animalSchema.methods.delete = function(dataFilter) {
	Message.remove(dataFilter, function(err, results) {
		if(err) {
			customEvents.emit("NodeJSForum:Message:CRUD:Delete:Error", err);			
		} else {			
			customEvents.emit("NodeJSForum:Message:CRUD:Delete:OK", results);
		}
});


var Message = db.model('Message', messageSchema, 'Message');
module.exports.Message = Message;
module.exports.eventManager = customEvents;
