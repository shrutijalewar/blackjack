'use strict';

module.exports = function(data){
    var socket = this;
    //console.log('msg rx from client', data);
    socket.broadcast.emit('bGlobalChat', data);
    socket.emit('bGlobalChat',  data);
};
