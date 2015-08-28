var socket = io();

$('#game-form').submit(function(){
  socket.emit('turn', $('#game-text-area').val());
  return false;
});

$('#message-form').submit(function(){
  socket.emit('message', $('#message-input').val());
  $('#message-input').val('');
  return false;
});

socket.on('turn', function(msg){
  $('#game-text-area').val(msg);
});

socket.on('message', function(msg){
  $('#message-output').append("<li>" + msg + "</li>");
});