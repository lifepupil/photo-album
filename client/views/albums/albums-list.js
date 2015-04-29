'use strict';

angular.module('poseidon')
.controller('AlbumsListCtrl', function($scope){
  $scope.afUser.$loaded(function(){
    $scope.names = $scope.afUser.names ? $scope.afUser.names.split(',') : [];
  });
});
