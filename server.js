var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    path = require('path');

app.use(express.static(path.join(__dirname, './www')));

io.on('connection', function(socket){
  
  console.log('a user connected');
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
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
