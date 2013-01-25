var Client = require('mysql').Client;
var client = new Client();
client.user = 'root';
client.password = 'aTReIDeS69';
client.host='127.0.01';
client.port='3306';
client.database='cupon'
//client.connect();		//Deprecado, se realiza por defecto

client.query(
	'SELECT * FROM Ciudad',
    function selectCiudad(err, results, fields) {
        if (err) 
        {
            console.log("Error: " + err.message);
            throw err;
        }
        console.log("Number of rows: "+results.length);
        console.log(results);
        client.end();
});
