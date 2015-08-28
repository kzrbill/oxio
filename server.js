var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path'),
    Chance = require('chance');

app.use(express.static('public'));

io.on('connection', function(socket){
  
  var chance = new Chance();
  var id = chance.string({alpha: true});

  // TODO: assign id to client so can display in browser, you are connected as ""
  // and also.
  io.emit('message', 'User ' + id + ' connected');
  
  socket.on('disconnect', function(){
    io.emit('message', 'a user disconnected');
  });

  socket.on('turn', function(msg){
    console.log('turn: ' + msg);
    io.emit('turn', msg);
  });

  socket.on('message', function(msg){
    console.log('message: ' + msg);
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening');
});

