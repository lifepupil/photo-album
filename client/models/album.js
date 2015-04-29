'use strict';

angular.module('poseidon')
.factory('Album', function($rootScope){
  function Album(){

  }
  Album.add = function(album){
    var names = $rootScope.afUser.names ? $rootScope.afUser.names.split(',') : [];
    console.info(names);
  };
  return Album;
});
