"use strict";

angular.module('app.synth').service("psersonSynthService", function($http, $q, APP_CONFIG) {
    
    // 根据id加载数据
    this.getCcZy = function(id) {
        var d = $q.defer();
        $http({
            method: 'GET',
            url: APP_CONFIG.baseUrl + '/ccZy/all',
            data: {
                id : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
})
