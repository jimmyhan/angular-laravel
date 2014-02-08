'use strict';

var myControllers = angular.module('myApp.Controllers', ['ngRoute', 'ngResource', 'ngSanitize']);

myControllers.controller('loginController', function ($scope, $sanitize, $location, $http, Authenticate, User, Flash) {
    //var User = $resource('service/users/:userId', { userId: '@id' });

    $scope.result = User.update({ id: 1 }, function (u, getResponseHeaders) {
        $scope.user = u;
    });

    $scope.users = User.query();

    User.get({ id: 1 }, function (u, getResponseHeaders) {
        $scope.user = u;
    });

    //$http({ method: 'GET', url: '/api/user' }).
    //  success(function(data, status, headers, config) {
    //      $scope.users = data;
    //      // when the response is available
    //  }).
    //  error(function(data, status, headers, config) {
    //      // called asynchronously if an error occurs
    //      // or server returns response with an error status.
    //  });

    //$scope.users = Users.get();
    //User.get({}, function (response) {
    //    $scope.users = response.users;
    //});

    $scope.login = function () {
        Authenticate.save({
            'email': $sanitize($scope.email),
            'password': $sanitize($scope.password)
        }, function () {
            $location.path('/home')
            Flash.clear()
            sessionStorage.authenticated = true;
        }, function (response) {
            //Flash.show(response.flash)
        })
    }
});
//myControllers.controller('loginController', function ($scope, $sanitize, $location, Authenticate) {
//    $scope.login = function () {
//        Authenticate.save({
//            'email': $sanitize($scope.email),
//            'password': $sanitize($scope.password)
//        }, function () {
//            $scope.flash = '';
//            $location.path('/home');
//        }, function (response) {
//            $scope.flash = response.data.flash;
//        });
//    };
//});

//myControllers.controller('homeController', ['$scope', '$location', 'Movies', 'flash', function ($scope, $location, Movies, flash) {
myControllers.controller('homeController', function ($scope, $location, authenticate, movies, flash) {
    if (!sessionstorage.authenticated) {
        $location.path('/')
        flash.show("you should be authenticated to access this page")
    }
    Movies.get({}, function (response) {
        $scope.movies = response.movies;
    });
    $scope.logout = function () {
        Authenticate.get({}, function (response) {
            delete sessionstorage.authenticated;
            flash.show(response.flash);
            $location.path('/');
        });
    };
});

//myControllers.controller('homeController', function ($scope, $location, $http) {
//    $location.path('../app/controllers/');
//    $scope.url = 'homeController.php';
//    $http.get($scope.url).
//        success(function (data, status, headers, config) {

//        }).
//        error(function (data, status, headers, config) {

//        });

//});