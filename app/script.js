(function(){
  
  var app = angular.module('app', []);

  app.controller('authorController', function($http, $scope){
    
    
    $scope.saveAuthor = function(mauthor) {

      var formdata = {lastname: mauthor.lastname, firstname: mauthor.firstname};
      
      $http({
        url : '/author',
        method: 'POST',
        data: formdata,
        headers: {'Content-Type' : 'application/json'}
      }).
      success(function(data){
        console.log(data)
        $scope.authors = data;
      }).
      error(function(data){
        console.log("Error " + data);
      });
    };

  });

})();
