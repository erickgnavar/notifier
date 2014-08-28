var app = angular.module('notifierApp', []);

app.controller('mainCtrl', ['$scope', 'socket', function ($scope, socket) {
    $scope.notifications = [];
    socket.on('notification', function (notification) {
        notification.date = new Date(notification.date);
        $scope.notifications.push(notification);
    });
}]);

app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:3000');
    return {
        on: function (event, callback) {
            socket.on(event, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }
    };
});