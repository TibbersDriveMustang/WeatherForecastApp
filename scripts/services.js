//Services
weatherApp.service('cityService', function(){
    this.city = "Dallas, TX";
});

weatherApp.service('weatherService', ['$resource',function($resource){
   
    this.GetWeather = function(city, days){
        
        var weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily?APPID=6842a7042b38290884e0ae5a8a2baedc", {get: {method: "JSONP"}});

        return weatherAPI.get({ q: city, cnt: days});        
    };

}]);