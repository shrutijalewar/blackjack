'use strict';

var Room = require('../../../models/room.js');

module.exports = {
    description: 'Get all Rooms Info',
    tags:['get', 'room'],
    handler: function(request, reply){
        Room.find().populate('owner').exec(function(err, rooms){
            rooms = rooms.map(function(room){
                return{name:room.name, avatar: room.owner.avatar, createdAt: room.createdAt};
            });
            reply({rooms:rooms});

        });
    }
};
