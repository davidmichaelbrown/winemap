'use strict';

var bacchosServices = angular.module('bacchosServices', []);

bacchosServices.factory('mapService', ['$http', function ($http) {

    function getHttp(url, keys) {
        var response = $http({
            method  : 'GET',
            url     : url,
            params  : keys,  
            headers : {'Content-Type': 'application/x-www-form-urlencoded'}
        })
        return response
    }
    return {
        get: function (url, keys) {
            return new getHttp(url, keys)
        }  
    } // return
}]);

bacchosServices.factory('geoLocation', ['$window', '$q', function($window, $q) {
    var getGeoLocation = function () {
        var deferred = $q.defer();
        $window.navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position)
            deferred.resolve(position);
        },  function(err) {
                console.log('err', err);
                var defaultPosition = {lat: 30, lng: 10};
                deferred.resolve(defaultPosition); 
            }
        )
        return deferred.promise
    }
    return {
        get: function () {
            return getGeoLocation()
        }
    }
}]);
