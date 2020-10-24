"use strict";

angular.module('app.supervise').service("ptServiceIndex", function($http,$rootScope, $q, APP_CONFIG) {

    this.getIndex = function (types) {
        var orgId = $rootScope.orgInfo.orgId;
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/depotStyle/getAllPointChart',
            params : {
                type : types,
                orgId : orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

    this.getHouseStatePointChart = function (types) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/depotStyle/getHouseStatePointChart',
            params : {}
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

    this.getCameraErrCount = function () {
    	var orgId = $rootScope.orgInfo.orgId;
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.intelligentUrl + '/quality/getCameraErrCount',
            params : {
            	orgId : orgId
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
            d.reject("error");
        });
        return d.promise;
    }

});