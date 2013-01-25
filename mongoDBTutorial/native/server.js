var mongo = require('mongodb');
var cServer = mongo.Server;
var cDb = mongo.Db;

var server = new cServer('localhost', 27017, {auto_reconnect: true});
var db = new cDb('animalCRUD', server,  {safe:false});

/*var animalCRUDHandler = function() {
	this.collection = null,
	this.__construct = function(err, collection) {
		if(!err) {
			this.collection = collection;
		}
	},
	this.collection.insert = function(dataInsert, isSafe, function(err, result) {
		if(err) {
			console.log("Error detected");
			console.log(err);
		} else {
			console.log("All done correctly");
		}
	});
};*/

/*function errorHandler(err) {
	if(err) {
		console.log("ERROR: ");
		console.log(err);
	}
}

var callbackError = new errorHandler;

db.collection.insert = function(dataInsert, dataDB, callbackError) {	
}*/

db.open(function(err, db) {
  if(!err) {
    db.collection('animalCRUD', function(err, collection) {
		if(!err) {
						
			var testCat = {"nombre" : "Merlin", "raza" : "Comun Europeo", "datos" : "El gato mas tonto y fiel del mundo"};
			// db.collection.insert(testCat, {safe: true}, callbackError);
			
			collection.insert(testCat, {safe:true}, function(err, result) {
				if(!err) {
					console.log("Correctamente insertado");
				}				
			});
		}
	});	
  }
});
