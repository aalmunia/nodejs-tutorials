var application = require('http').createServer(handlerServer);

application.listen(9998);

function handlerServer(request, response) {
	var aText = ["Julia es una joven enfermera que vive en Cold Rock, un pueblo del norte de Estados Unidos en absoluta decadencia desde que ha cerrado la fábrica que daba trabajo a la mayoría de habitantes. En poco tiempo han desaparecido varios niños del lugar sin que nadie sepa la causa aunque los más supersticiosos las atribuyen al Hombre Alto: una oscura figura que se lleva a los más pequeños. Cuando el hijo de Julia desaparece misteriosamente, ella hará todo lo posible por recuperarlo y obtener respuestas a los interrogantes que aterran la localidad ¿quién es el Hombre Alto y qué les ocurre realmente a los niños raptados?",
		         "'El origen de los Guardianes' es una gran aventura que cuenta la historia de un grupo de héroes con extraordinarios poderes. Cuando un espíritu maligno llamado Pitch se propone inundar de miedo los corazones de los niños de todo el mundo, los Guardianes se unen por primera vez para plantarle cara y defender al mundo de este temido enemigo. 'El origen de los Guardianes' es una adaptación de la saga de libros juveniles 'The Guardians of Childhood' ('Los guardianes de la infancia') escritos e ilustrados por William Joyce.",
				 "Llega a la gran pantalla la película del oscarizado cineasta Peter Jackson: El hobbit: Un viaje inesperado, la primera de las trilogía de la adaptación cinematográfica de la gran y popular obra maestra El hobbit, de J.R.R. Tolkien. La segunda película se llamará El hobbit: Partida y regreso.Las tres películas cuentan una historia continua, ambientadas en la Tierra Media 60 años antes de El Señor de los anillos, la exitosa trilogía que Jackson y su equipo de cineastas llevaron a la gran pantalla y que culminó con la ganadora del premio Oscar® El Señor de los anillos: El retorno del rey.",
				 "Ralph, está harto de ser la sombra de Fix-It Felix, el perfecto 'chico bueno' de su videojuego. Así que después de 10 años haciendo lo mismo y viendo cómo Felix se lleva todo el mérito, Ralph decide dejar atrás el papel de chico malo. Se pone manos a la obra y emprende un viaje por todas las generaciones de videojuegos. Quiere demostrar que tiene madera de héroe.",
				 "LOS MISERABLES transcurre en la Francia del siglo XIX y cuenta una emotiva historia de sueños rotos, amor no correspondido, pasión, sacrificio y redención: una prueba atemporal de la fuerza del espíritu humano. Hugh Jackman es Jean Valjean, el exconvicto al que persigue durante décadas el despiadado policía Javert (Russell Crowe) después de saltarse la condicional. Cuando Valjean accede a cuidar a Cosette, la joven hija de Fantine (Anne Hathaway), sus vidas cambiarán para siempre",
				 "La captura de Osama bin Laden preocupó al mundo y a dos administraciones presidenciales estadounidenses durante más de una década. Al final, un pequeño y brillante grupo de agentes de la CIA le encontró. Fue una misión llevada en el secreto más absoluto. Algunos detalles han salido a la luz, pero las partes más significativas de la operación secreta, y sobre todo el papel que jugó el equipo de agentes, se verán por primera vez en la fascinante película del oscarizado dúo compuesto por Kathryn Bigelow y Mark Boal.",
				 "Basada en hechos reales, Argo relata una operación secreta, de vida o muerte, para rescatar a seis estadounidenses en plena crisis de los rehenes de Irán. La verdad permaneció oculta al gran público durante décadas. El 4 de noviembre de 1979, mientras la revolución iraní alcanzaba su punto álgido, algunos militantes irrumpieron en la embajada de Estados Unidos en Teherán y tomaron cincuenta y dos prisioneros estadounidenses. Sin embargo, en mitad del caos, seis de ellos logran escapar y encuentran refugio en casa del embajador canadiense. Sabiendo que es sólo cuestión de tiempo que los encuentren y, muy probablemente, los maten, un especialista de la CIA en operaciones especiales llamado Tony Mendez (Ben Affleck) urde un arriesgado plan para sacarlos del país de forma segura. Un plan tan increíble que sólo podría salir bien en una película.",
				 "Empieza el año escolar. Germain, profesor de francés, corrige los deberes de sus nuevos alumnos. Es desastroso. Sin embargo, un chico que prefiere sentarse discretamente en la última fila, 'desde donde se puede ver a los demás', demuestra tener un afilado sentido de la observación, incluso de una visión sutil. Alentado por el profesor, empieza una redacción tipo folletín, penetrando en el mundo de dos familias: una perteneciente a la pequeña burguesía, con sus esperanzas y frustraciones; y otra más cercana a la vida intelectual y artística. La realidad y la ficción se entremezclan hasta confundirse en un juego ingenioso. Pero ¿qué oscuras intenciones esconde el joven y hasta dónde llegarán sus maquinaciones?",
				 "Bella concluye su transformación en vampiro y ahora debe familiarizarse con su nueva condición. Con el nacimiento de Renesmee, la familia Cullen deberá protegerse ante la amenaza de los Volturi ya que existe una ley para los vampiros que prohíbe a todos los clanes convertir a niños, pues son difíciles de controlar y pueden generar auténticas masacres que pongan en peligro la secreta existencia de los vampiros..."];
				 
	var aName = ["Alejandro", "Vanessa", "Raul", "Javier", "Chema", "Oscar" , "Jose", "Kiko"];
	var aData = ["GOPR-6798", "LOPERT-4512", "NIMHER-7676", "NOMALIAN-6565", "MITTER-6512", "LOBIM-9809"];	
	
	// var aFinal = [aText[(Math.floor((Math.random()* aText.length)], aName[(Math.floor((Math.random()*10)+1))],, 
	var rand1 = Math.floor((Math.random() * aText.length));
	var rand2 = Math.floor((Math.random() * aName.length));
	var rand3 = Math.floor((Math.random() * aData.length));
	
	// console.log(rand1);
	// console.log(rand2);
	// console.log(rand3);
	
	var aFinal = {};
	for(var i = 0; i < 1000; i++) {
		aFinal[i] = {};
		aFinal[i].text = aText[rand1];
		aFinal[i].name = aName[rand2];
		aFinal[i].data = aData[rand3];
	}
	
	response.writeHead("Content-type: application/json; Charset=utf-8");
	response.end(JSON.stringify(aFinal));	
}
