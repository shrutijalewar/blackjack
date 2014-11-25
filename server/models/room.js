'use strict';

var mongoose = require('mongoose'),
    bcrypt   = require('bcrypt'),
    RoomSchema = null,
    Room = null;

RoomSchema = new mongoose.Schema({
    name:  {type: String, required: true, validate: [nameV, 'name length'], unique: true},
    password:  {type: String, required: true, validate: [passwordV, 'password length']},
    owner:  {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date,  required: true, default: Date.now}
});

RoomSchema.methods.encrypt = function(){
    this.password = bcrypt.hashSync(this.password, 10);
};

function nameV(v){
    return v.length >= 3 && v.length <= 15;
}

function passwordV(v){
    return v.length === 60;
}

RoomSchema.statics.login = function(obj, cb){
    console.log('oooooooooo',obj);
    Room.findOne({name: obj.name}, function(err, room){
        console.log('rrrrrrrrrrr', room);
        if(!room){
            return cb();
        }

        var isGood = bcrypt.compareSync(obj.password, room.password);
        console.log(isGood);
        if(!isGood){
            return cb();
        }

        cb(room);
    });
};


Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
