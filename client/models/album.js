'use strict';

angular.module('poseidon')
.factory('Album', function($rootScope, $firebaseArray, $window){
  function Album(){
  }


  Album.addPhoto = function(file, name) {
    var fbPhotos = $rootScope.fbUser.child('albums/' + name + '/photos');
    var afPhotos = $firebaseArray(fbPhotos);
    console.log(afPhotos);
    return afPhotos.$add(file);
  };

  Album.add = function(album){
    var names = $rootScope.afUser.names ? $rootScope.afUser.names.split(',') : [];
    var fbAlbums = $rootScope.fbUser.child('albums/' + album.name);
    var afAlbums = $firebaseArray(fbAlbums);
    names.push(album.name);
    var albumTemp = angular.copy(album);
    $rootScope.afUser.names = names.join(',');
    $rootScope.afUser.$save();
    albumTemp.createdAt = $window.Firebase.ServerValue.TIMESTAMP;
    albumTemp.date = album.date.getTime();
    afAlbums.$add(albumTemp);
  };
  Album.deletePhoto = function(index, name){
    var fbPhotos = $rootScope.fbUser.child('albums/' + name + '/photos');
    var afPhotos = $firebaseArray(fbPhotos);
    afPhotos.$loaded().then(function(){
      afPhotos.$remove(index);
    });
  };
  return Album;
});
