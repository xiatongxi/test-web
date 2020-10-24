"use strict";
angular.module('app.synth').service("barnSynthService", function($http, $q, APP_CONFIG) {

    // 根据id获取id下的全部库信息
    this.loadAllDataById = function(pageNum,pageSize,id,searchCondition) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.baseUrl + '/barn/getBarnList',
            data: {
                pageNum : pageNum,
                pageSize : pageSize,
                orgId : id,
                barnName : searchCondition==undefined?"":searchCondition.barnName
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    // 根据id获取单个库的信息
    this.loadDataById = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.baseUrl + '/orgInfo/edit',
            data: {
                orgId : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }

    // 获取全部数据
    this.getLibraryAllList = function(id) {
        var d = $q.defer();
        $http({
            method: 'POST',
            url: APP_CONFIG.baseUrl + '/barn/getLibraryAllList',
            data: {
                orgId : id
            }
        }).then(function successCallback(response) {
            d.resolve(response.data);
        }, function errorCallback(response) {
        });
        return d.promise;
    }
    
})
