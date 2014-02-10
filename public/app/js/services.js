'use strict';

var myService = angular.module('myApp.Service', ['ngResource']);

//For csrf, In a rails app you have to add <%= csrf_meta_tags %> in your header layout (if not there by default)
//app.config(["$httpProvider", function (provider) {
//    provider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');
//}]);

myService.factory('User', function ($resource) {
    return $resource('/api/user/:id',
            { id: '@id' },
            {
                //list: { method: 'GET', isArray: true }, //same as query
                //create: { method: 'POST' }, // same as save
                //update: { method: 'PUT' }
                 //DEFAULT IMPLEMENTATION OF $RESOURCE
                  'get':    {method:'GET'},
                  'create': {method:'POST' }, // same as save
                  'update':   {method:'PUT'},
                  'query':  {method:'GET', isArray:true},
                  'delete': {method:'DELETE'}
            });
});

myService.factory('Authenticate', function ($resource) {
    return $resource("/api/authenticate/");
})
    .factory('Movies', function ($resource) {
        return $resource("/api/movies")
    })
    //.factory('Users', function ($resource) {
    //    return $resource("/service/users/:userId", {},
    //        {
    //            get: { method: 'GET' },
    //            params: { userId: '1' },
    //            isArray: true
    //        });
    //})
    .factory('Flash', function ($rootScope) {
        return {
            show: function (message) {
                $rootScope.flash = message
            },
            clear: function () {
                $rootScope.flash = ""
            }
        }
    });