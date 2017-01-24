//Controllers
weatherApp.controller('homeController', ['$scope', '$location','cityService',
function($scope, $location, cityService){

    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
        cityService.city = $scope.city;
    });
    
    $scope.submit = function(){
        $location.path("/forecast");
    };
    
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