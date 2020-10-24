"use strict";
angular.module('app.storage').service("safeAccidentManageService", function($http, $q, APP_CONFIG, $rootScope) {
    // 安全事故管理列表
    this.getPageInfo = function(pageInfo,storehouseId){
        var d = $q.defer();
        $http({
            method : 'GET',
            url : APP_CONFIG.safeProduceUrl + '/safeAccidentManage/getList',
            params : {
                pageNum : pageInfo.pageNum,
                pageSize : pageInfo.pageSize,
                houseId : storehouseId,
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
    this.save = function(safeProduceAccident){
        var d = $q.defer();
        $http({
            method : 'POST',
            url : APP_CONFIG.safeProduceUrl + '/safeAccidentManage/save',
            data : {
                safeProduceAccidentJson : angular.toJson(safeProduceAccident)
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
            url : APP_CONFIG.safeProduceUrl + '/safeAccidentManage/edit',
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

});