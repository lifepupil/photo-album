'use strict';

angular.module('poseidon')
.controller('AlbumsShowCtrl', function($scope, Album, $rootScope, $firebaseArray, $state){
  $scope.name = $state.params.name;
  $rootScope.afUser.$loaded()
  .then(function(){
    $scope.afPhotos = getPhotos();
    $scope.album = $rootScope.afUser.albums[$scope.name];
    var keys = [];
    var key;
    for(var k in $scope.album){
      keys.push(k);
    }
    key = keys[0];

    $scope.album = $scope.album[key];
    console.log($scope.album);
    console.log('keys', keys);
    console.log('key', key);
  });

  $scope.addPhoto = function(){
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    reader.onloadend = function () {
      preview.src = reader.result;
      Album.addPhoto(reader.result, $scope.name);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  };
  $scope.deletePhoto = function(index){
    Album.deletePhoto(index, $scope.name);
    console.log('click', index, $scope.name);
  };

  function getPhotos(){
    var fbPhotos = $rootScope.fbUser.child('albums/' + $scope.name + '/photos');
    var afPhotos = $firebaseArray(fbPhotos);
    return afPhotos;
    }
});
