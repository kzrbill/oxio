var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path'),
    Chance = require('chance');

app.use(express.static('public'));

var usersConnected = 0;

io.on('connection', function(socket){

  usersConnected++;
  io.emit('message', 'server says: user connected (' + usersConnected + ')');
  
  socket.on('disconnect', function(){
    usersConnected--;
    io.emit('message', 'server says:: user disconnected (' + usersConnected + ')');
  });

  socket.on('gameStateUpdate', function(game){
    io.emit('gameStateUpdate', game);
  });

  socket.on('message', function(msg){
    io.emit('message', msg);
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening');
});

