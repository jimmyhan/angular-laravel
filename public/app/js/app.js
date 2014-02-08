'use strict';

var myApp = angular.module('myApp', ['ngRoute', 'ngResource', 'ngSanitize', 'myApp.Controllers', 'myApp.Service']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: 'app/partials/login.html', controller: 'loginController' }).
        when('/home', { templateUrl: 'app/partials/home.html', controller: 'homeController' }).
        otherwise({ redirectTo: '/' });
}]);

//myApp.config(function ($httpProvider) {
//    var interceptor = function ($rootScope, $location, $q, Flash) {

//        var success = function (response) {
//            return response;
//        }

//        var error = function (response) {
//            if (response.status == 401) {
//                delete sessionStorage.authenticated;
//                $location.path('/');
//                Flash.show(response.data.flash);

//            }
//            return $q.reject(response);
//        }

//        return function (promise) {
//            return promise.then(success, error);
//        };
//    };

//    $httpProvider.responseInterceptors.push(interceptor);
//});

myApp.run(function ($http, CSRF_TOKEN) {
    $http.defaults.headers.common['csrf_token'] = CSRF_TOKEN;
});

