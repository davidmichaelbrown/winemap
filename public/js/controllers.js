var bacchosControllers = angular.module('bacchosControllers', ['ngSanitize']).


    controller('MapCtrl', ['$scope', 'mapService',
        function ($scope, mapService) {

            var mapData = {};

            $scope.wineContent = false;
            $scope.hideWines = true;
           
            $scope.$on('leafletDirectiveMarker.click', function (event, markerName) {
                $scope.wineContent = true;
                $scope.hideWines = true;
                var name = markerName.markerName;
                var store = mapData.markers[name]['store'];
                $scope.store = store;

            });

            $scope.search = true;
            // Update the scope store request
            $scope.updateScope = function(data) {
                console.log('updating')
                $scope.wines = {};
                $scope.wineContent = false; 
                mapData = data;
                $scope.markers = mapData.markers || {};
                $scope.center = {
                    lat: mapData.centerLat || 40.095,
                    lng: mapData.centerLng || -3.823,    
                    zoom: mapData.zoom 
                }
            }

            // Country and zip for stores request
            $scope.keys = {};

            // add the kwys from the form
            $scope.addKeys = function(formData) {
                console.log('keys loaded');
                $scope.keys = angular.copy(formData);
            }
            
            // Request the store data from the service
            $scope.processForm = function(url) {
                var mapData = mapService.get(url, $scope.keys);  
                mapData.success(function (data, status, headers, config) {
                    console.log('woop')
                    $scope.updateScope(data);
                }).
                error(function (data, status, headers, config) {
                    console.log(data);
                    console.log(status);
                });
                
            };   

            // Set params for map init
            angular.extend($scope, {
                markers: {},
                center:  {
                    lat: 40.095,
                    lng: -3.823,    
                    zoom:  6
                },
                events: {
                    markers: {
                        enable: ['click', 'mouseover', 'mouseout'],
                        logic: 'emit'
                    }
                }
            }); 
        } // start func
    ]); //controller