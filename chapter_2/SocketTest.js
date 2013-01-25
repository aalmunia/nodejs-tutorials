var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);

app.listen(8045);

function handler (req, res) {  
}

io.sockets.on('connection', function (socket) {  
  socket.on('msgToServer', function(data) {
	  var strResponse = data.userName + ' dice: ' + data.message;
	  socket.emit('msgFromServer', strResponse);
  });
});
