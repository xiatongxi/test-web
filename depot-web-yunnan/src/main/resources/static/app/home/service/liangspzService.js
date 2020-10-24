"use strict";

angular.module('app.system').service("liangspzService", function($http, $q, APP_CONFIG,$rootScope) {
    this.getDate = function(orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/agile/kcsw/getDate',
            params : {
            	orgId : orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    
    this.getDateDj = function(orgId) {
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/agile/kcsw/getDateDj',
            params : {
            	orgId : orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
    
    this.getDateBl = function(orgId) {
        var d = $q.defer();
        var effectiveCapacity = $rootScope.depotInfo.effectiveCapacity;
        $http({
            method : 'GET',
            url : APP_CONFIG.agileUrl + '/agile/kcsw/getDateBl',
            params : {
            	effectiveCapacity : effectiveCapacity,
            	orgId : orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    }
})
