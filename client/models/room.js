(function(){
    'use strict';

    angular.module('hapi-auth')
        .factory('Room', ['$http', function($http){

            function create(room){
                console.log(room);
                return $http.post('/rooms', room);
            }
            function all(){
                return $http.get('/rooms');
            }

            function join(room){
                return $http.post('/rooms/' + room.name + {password:room.password});
            }
            return {create:create, all:all, join:join};
        }]);
})();
