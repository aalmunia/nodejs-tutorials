var mongoose = require("mongoose");
var db = mongoose.connect("localhost", "animalCRUD");
var events = require('events');
var customEvents = new events.EventEmitter;

// Si no, van a salir Warnings por consola de tipo posible memory leak...
customEvents.setMaxListeners(0);

var animalSchema = mongoose.Schema({
	name : {type: String, required: true},
	race : {type: String , required: true}}, 
	{strict: true});

animalSchema.methods.create = function(eventsObject) {
	this.save(function(err) {
		if(err) {
			err["documentData"] = this;
			customEvents.emit("MongooseTutorial:CRUD:Create:Error", err);
		} else {
			customEvents.emit("MongooseTutorial:CRUD:Create:OK");
		}
	});
}

animalSchema.methods.read = function(dataFilter) {
	Animal.find(dataFilter, function(err, results, more) {		
		customEvents.emit("MongooseTutorial:CRUD:Read:OK", results);		
	});
}

animalSchema.methods.update = function(query, update, options, multi) {
	Animal.update(query, update, options, function(err) {
		if(err) {
			customEvents.emit("MongooseTutorial:CRUD:Update:Error", err);
		} else {
			customEvents.emit("MongooseTutorial:CRUD:Update:OK");			
		}
	});
}

animalSchema.methods.delete = function(dataFilter) {
	Animal.remove(dataFilter, function(err, results) {
		if(err) {
			customEvents.emit("MongooseTutorial:CRUD:Delete:Error", err);			
		} else {			
			customEvents.emit("MongooseTutorial:CRUD:Delete:OK", results);			
		}
	});
}

var Animal = db.model('Animal', animalSchema, 'Animal');
module.exports.Animal = Animal;
module.exports.eventManager = customEvents;
