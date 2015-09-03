var socket = io();

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