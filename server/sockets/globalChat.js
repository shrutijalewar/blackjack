'use strict';

module.exports = function(data){
    var socket = this;
    //console.log('msg rx from client', data);
    socket.broadcast.emit('GlobalChat', data);
    socket.emit('GlobalChat',  data);
};
