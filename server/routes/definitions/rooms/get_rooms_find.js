'use strict';

var Joi  = require('joi'),
    Room = require('../../../models/room.js');

module.exports = {
    description: 'Find a Room',
    tags:['get', 'room'],
    validate: {
        params: {
            roomId: Joi.string().regex(/^[a-f0-9]{24}$/).required()
        }
    },
    handler: function(request, reply){
        Room.findOne({_id:request.params.roomId}).populate('owner').exec(function(err, room){
            room.password = room.owner.password = null;
            reply(room);
        });
    }
};
