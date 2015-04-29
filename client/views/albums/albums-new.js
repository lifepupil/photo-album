'use strict';

angular.module('poseidon')
.controller('AlbumsNewCtrl', function($scope, Album){
  $scope.add = function(album){
    console.log('click', album);
    Album.add(album);
  };
});
