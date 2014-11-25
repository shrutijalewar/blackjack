'use strict';

var Joi  = require('joi'),
    Room = require('../../../models/room.js');

module.exports = {
    description: 'Create a Room Info',
    tags:['post', 'room'],
    validate: {
        payload: {
            name: Joi.string().min(3).max(15).required(),
            password: Joi.string().min(3).max(15).required()
        }
    },
    handler: function(request, reply){
        request.payload.owner = request.auth.credentials._id;
        var room = new Room(request.payload);
        room.encrypt();
        room.save(function(err){
            reply({name:room.name, avatar: request.auth.credentials.avatar, createdAt: room.createdAt}).code(err ? 401 : 200);
        });
    }
};
