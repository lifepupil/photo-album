'use strict';

angular.module('poseidon')
.controller('AlbumsShowCtrl', function($scope, Album, $rootScope, $firebaseArray, $state){
  $scope.name = $state.params.name;
  $rootScope.afUser.$loaded()
  .then(function(){
    $scope.afPhotos = getPhotos();
  });

  $scope.addPhoto = function(photo){
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

  function getPhotos(){
    var fbPhotos = $rootScope.fbUser.child('albums/' + $scope.name + '/photos');
    var afPhotos = $firebaseArray(fbPhotos);
    return afPhotos;
    }
});
