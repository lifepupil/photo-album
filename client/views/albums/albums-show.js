'use strict';

angular.module('poseidon')
.controller('AlbumsShowCtrl', function($scope, Album, $document){

  $scope.addPhoto = function(photo){
    console.log('control init');
    var preview = document.querySelector('img');
    var file    = document.querySelector('input[type=file]').files[0];
    var reader  = new FileReader();
    console.log(file);
    reader.onloadend = function () {
      preview.src = reader.result;
      console.log(reader.result);
      // Album.addPhoto(reader.result)
    };

    if (file) {
      reader.readAsDataURL(file);
      console.log(file);
    } else {
      preview.src = '';
    }
  };
});
