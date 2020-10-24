"use strict";

angular.module('app.storage').service("safeProduceNotifyService", function($http, $q, APP_CONFIG, $rootScope) {
    //安全生产通告分页列表
    this.getPageInfo = function(pageNum, pageSize, fileName){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.safeProduceUrl + '/safeProduceNotify/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                fileName : fileName,
                orgId : $rootScope.orgInfo.orgId
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };

    // 保存
    this.save = function(safeProduceNotify){
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.safeProduceUrl + '/safeProduceNotify/save',
            data : {
                safeProduceNotifyJson : angular.toJson(safeProduceNotify)
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };

    this.edit = function(id){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.safeProduceUrl + '/safeProduceNotify/edit',
            params : {
                id : id
            }
        }).then(function successCallback(response) {
            // 请求成功执行代码
            d.resolve(response.data);
        }, function errorCallback(response) {
            // 请求失败执行代码
            d.reject("error");
        });
        return d.promise;
    };

    this.removeById = function(id){
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.safeProduceUrl + '/safeProduceNotify/remove',
            data : {
                id : id
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

});