"use strict";

angular.module('app.supervise').service("ptService", function($http,$rootScope, $q, APP_CONFIG) {

    this.getIndex = function (types) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.superviseUrl + '/depotStyle/getAllPointChart',
            params : {
                type : types
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
            url : APP_CONFIG.superviseUrl + '/depotStyle/getHouseStatePointChart',
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
            url : APP_CONFIG.monitorUrl + '/quality/getCameraErrCount',
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