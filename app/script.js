(function(){
  
  var app = angular.module('app', []);

  app.controller('authorController', function($http, $scope){

    $scope.authors = authorFetch();

    $scope.a = {
      lastname: '',
      firstname: '',
      books: []
    }

    $scope.addBook = function(mbook){
      $scope.a.books.push(mbook);
      $scope.booktemp = null
    }


    $scope.saveAuthor = function(mauthor) {
      var formdata = {lastname: mauthor.lastname, firstname: mauthor.firstname, books: mauthor.books};
      $http({
        url : '/author',
        method: 'POST',
        data: formdata,
        headers: {'Content-Type' : 'application/json'}
      }).
      success(function(data){
        console.log(data)
        //$scope.authors = data;
        $scope.authors = authorFetch();
      }).
      error(function(data){
        console.log("Error " + data);
      });

    // clear the contents of the textfields
    $scope.a.lastname = null;
    $scope.a.firstname = null


    };

    function authorFetch(){
      $http.get('/author').
      success(function(data){
        $scope.authors = data;
      }).
      error(function(data){
        console.log("Error " + data);
      });
    };

  });

  app.controller('authorListController', function($scope, $http){
    $http.get('/author').
    success(function(data){
      $scope.authors = data;
    }).
    error(function(data){
      console.log("Error " + data);
    });
  });

})();
