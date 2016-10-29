var app = angular.module('ItemsApp',[]);

app.controller('ItemsController',['$scope','$q', function($scope, $q){

    $scope.newUserName = '';
    $scope.nameFilter = '';

    var mockGetUsers = function(){
        var mockData = '[{"id":1,"fullname":"Taras Sheva"},{"id":2,"fullname":"Some Dude"},{"id":3,"fullname":"Taras Shevchenko"},{"id":4,"fullname":"Inna Baa"},{"id":5,"fullname":"Taras Taras"},{"id":6,"fullname":"Sash Kaa"}]';
        return $q.resolve(JSON.parse(mockData));
    };

    mockGetUsers()
        .then(function(data){
            $scope.users = data;
            $scope.filteredUsers = $scope.users;

            $scope.$watchGroup(['nameFilter','users.length'], function () {
                $scope.filteredUsers = $scope.users.filter(
                    user => user.fullname.toLowerCase().trim()
                        .includes($scope.nameFilter.toLowerCase().trim()));
            });
        });

    $scope.addUser = function(){
        if (!$scope.newUserName)
            return;
        $scope.users.push({
            id: 10 + (Math.random() * 100000) | 0,
            fullname : $scope.newUserName
        });
        $scope.newUserName = '';
        console.log('New user added: '+$scope.users[$scope.users.length - 1].fullname)
    };

    $scope.deleteUser = function(delUser){
        let index = $scope.users.findIndex(user => user == delUser);
        console.log('User deleted: '+$scope.users[index].fullname);
        $scope.users.splice(index, 1);
    };

    $scope.clearNameFilter = function(){
        $scope.nameFilter = '';
    };
}]);