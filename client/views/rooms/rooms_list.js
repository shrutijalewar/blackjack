(function(){
    'use strict';

    angular.module('hapi-auth')
        .controller('Rooms_listCtrl', ['$scope', '$state','$rootScope','Room', function($scope, $state, $rootScope, Room){

            $scope.child = 'Rooms List';

            $scope.chat = function(msg){
                socket.emit('globalChat',{
                    avatar: $rootScope.rootuser.avatar,
                    username: $rootScope.rootuser.username,
                    body: msg
                });
                $scope.msg = null;
            };
            socket.on('bGlobalChat', function(msg){
                //console.log(data);
                $('#messages').append('<div class="chat"><img src="'+ msg.avatar + '"/>'+ msg.username+ ':' + msg.body +'</div><hr />');
            });

            $scope.room = {};
            $scope.rooms =[];

            $scope.addRoom = function(){
                Room.create($scope.room).then(function(response){
                    console.log(response);
                    $scope.rooms.push(response.data);
                    $scope.room = {};
                });
            };
            Room.all().then(function(response){
                $scope.rooms = response.data.rooms;
            });
        }]);
})();
