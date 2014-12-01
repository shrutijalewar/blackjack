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

            $scope.join = function(room){
                Room.join({name:room.name, password:this.password}).then(function(response){
                   var roomId = response.data.roomId;
                    $state.go('rooms.detail',{roomId:roomId});
                });
            };

            socket.off('globalChat');
            socket.on('globalChat', function(data){
                $scope.messages.unshift(data);
                $scope.messages = $scope.messages.slice(0, 100);
                $scope.msg = null;
                $('#message').focus();
                $scope.$digest();
            });
        }]);
})();
