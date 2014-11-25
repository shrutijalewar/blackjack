(function(){
    'use strict';

    angular.module('hapi-auth')
        .controller('Rooms_listCtrl', ['$scope', '$state','$rootScope', function($scope, $state, $rootScope){

            $scope.child = 'Rooms List';

            $scope.chat = function(msg){
                socket.emit('globalChat',{
                    avatar: $rootScope.rootuser.avatar,
                    username: $rootScope.rootuser.username,
                    body: msg
                });
                $scope.msg = {};
            };
            socket.on('bGlobalChat', function(msg){
                //console.log(data);
                $('#messages').append('<div class="chat"><img src="'+ msg.avatar + '"/>'+ msg.username+ ':' + msg.body +'</div><hr />');
            });
        }]);
})();
