var mongoose = require("mongoose");
var db = mongoose.createConnection("localhost", "animalCRUD", 27017);
var application = require('http').createServer(handlerServer);
var url = require('url');
var isConnected = false;

application.listen(8098);

var animalSchema = mongoose.Schema({ nombre : String, raza : String });
var animal = db.model('Animal', animalSchema);
var kittie = db.model('Kitty', animalSchema);

var MongoAnimalCRUD = function()
{
  this.isConnected = false,
  this.dbHandler = null,
  this.animalSchema = null,
  this.animal = null,
  this.initializeCRUD = function(mongoDBhndl)
  {
    this.dbHandler = mongoDBhndl;
    this.dbHandler.on("error", function(error) {
      this.handleError(error);          
    });
    this.dbHandler.once("open", function() {
      this.isConnected = true;      
    });    
  },
  this.createAnimal = function(nombre, raza)
  {	
    var newAnimal = new animal;
    newAnimal.nombre = nombre;
    newAnimal.raza = raza;
    newAnimal.save(this.handleError);
    
    var newCat = new kittie;
    newCat.nombre = nombre;
    newCat.raza = raza;
    newCat.save(this.handleError);
  },
  this.readAnimal = function(id)
  {
  
  },
  this.updateAnimal = function(id, nombre, raza)
  {
  
  },
  this.deleteAnimal = function(id)
  {
  
  },
  this.handleError = function(error)
  {
	if(error != null)
	{	  
		console.log("SE PRODUJO UN ERROR: " + error);
	}
  }
};

function handlerServer(request, response) {
  db.on("error", function(error) { console.log("ERROR DETECTED: " + error); });
  db.once("open", function() { 	  
	  isConnected = true; console.log("ESTOY CONECTADO..."); 
  });
  var CRUD = new MongoAnimalCRUD;
  CRUD.initializeCRUD(db);
  CRUD.createAnimal("Joya", "Siamesa");
  response.end("YES, YES, I KNOW...");
}
