(function(){
    'use strict';

    angular.module('hapi-auth')
        .controller('Rooms_detailCtrl', ['$scope', '$state','$rootScope','Room', function($scope, $state, $rootScope, Room){
            $scope.messages = [];
            Room.find($state.params.roomId).then(function(response){
                $scope.room = response.data;
            });

            socket.emit('join', {roomId:$state.params.roomId});

            $scope.chat = function(msg){
                socket.emit('roomChat', {roomId:$state.params.roomId, avatar:$rootScope.rootuser.avatar, content:msg});
            };

            socket.off('roomChat');
            socket.on('roomChat', function(data){
                $scope.messages.unshift(data);
                $scope.messages = $scope.messages.slice(0, 100);
                $scope.message = null;
                $('#message').focus();
                $scope.$digest();
            });


        }]);
})();
