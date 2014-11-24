'use strict';

module.exports = {
  description: 'Get User Status',
  tags:['users'],
  handler: function(request, reply){
    //console.log('RRRRRRRRR', request.auth.credentials);
    reply(request.auth.credentials);
  }
};
