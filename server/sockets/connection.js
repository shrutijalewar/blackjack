'use strict';

module.exports = function(socket){
  socket.emit('online');
  socket.on('globalChat', require('./globalChat'));
  socket.on('roomChat', require('./roomChat'));
  socket.on('join', require('./join'));


// ** Scoket Logging **//

console.log('socket connected:', socket.id);

socket.on('disconnect', function(){
  console.log('Socket Disconnected:', socket.id);
});

console.log('Active Sockets:', this.sockets.length);
};


