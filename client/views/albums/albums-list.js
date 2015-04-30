'use strict';

angular.module('poseidon')
.controller('AlbumsListCtrl', function($scope, $rootScope, $firebaseArray){
  var fbAlbums = $rootScope.fbUser.child('albums/');
  var afAlbums = $firebaseArray(fbAlbums);
  $scope.albums = afAlbums;

  $scope.albums.$loaded(function() {
    $scope.names = [];
    for(var i = 0 ; i<$scope.albums.length ; i++) {
      var keys = [];
      for(var key in $scope.albums[i].photos) {
        keys.push(key);
      }

      var o ={
        name: $scope.albums[i].$id,
        image: $scope.albums[i].photos[keys[0]]
      };
      $scope.names.push(o);

      // console.log($scope.albums[i].$id);
      // console.log($scope.albums[i].photos[keys[0]]);
    }
  });
  //
  // $scope.afUser.$loaded(function(){
  //   $scope.names = $scope.afUser.names ? $scope.afUser.names.split(',') : [];
  // });

});
