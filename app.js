//Module
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//Routes
weatherApp.config(function($routeProvider){
   $routeProvider
   
   .when('/', {
       templateUrl: 'pages/home.htm',
       controller: 'homeController'
   })
   
   .when('/forecast', {
       templateUrl: 'pages/forecast.htm',
       controller: 'forecastController'
   })   
   
   .when('/forecast/:days', {
       templateUrl: 'pages/forecast.htm',
       controller: 'forecastController'
   })
   
});

//Services
weatherApp.service('cityService', function(){
    this.city = "New York, NY";
});


//Controllers
weatherApp.controller('homeController', ['$scope', 'cityService',
function($scope, cityService){

    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams','cityService', 
function($scope, $resource, $routeParams, cityService){
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '2';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=6842a7042b38290884e0ae5a8a2baedc", {get: {method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, cnt: $scope.days});
    
    $scope.convertToFahrenheit = function(degK){
        
        return Math.round(1.8 * (degK - 273) + 32);
    }
    
    $scope.convertToDate = function(dt){
        
        return new Date(dt * 1000);
    };
    
}]);

//Directives
weatherApp.directive("weatherReport", function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
        scope: {
            weatherDay: "=",
            convertToStandard: "&",
            convertToDate: "&",
            dateFormat: "@"
        }
    } 
});
