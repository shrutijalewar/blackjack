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

            return {create:create, all:all};
        }]);
})();
