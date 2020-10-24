"use strict";

angular.module('app.agile').service("fcbgzService", function($http, $q, APP_CONFIG) {
    this.getPageInfo = function(pageNum, pageSize, orgId, houseId, wareId, direction, modifyData) {
        var d = $q.defer();
        $http({
            method : 'GET', 
            url : APP_CONFIG.agileUrl + '/agile/fcbgzController/getList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                orgId : orgId,
                houseId : houseId,
                warehouseId : wareId,
                direction : direction,
                modifyData : modifyData
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

    //查询分仓保管账数据
    this.queryFcbgzData = function(datas) {
    	var d = $q.defer();
        $http({
            method : 'GET', 
            url : APP_CONFIG.agileUrl + '/agile/fcbgzController/queryFcbgzData',
            params : {
                datas : datas
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

    //按ID查询一条分仓保管账数据
    this.queryFindByIdData = function(id) {
    	var d = $q.defer();
        $http({
            method : 'GET', 
            url : APP_CONFIG.agileUrl + '/agile/fcbgzController/findByIdFcbgzData',
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
    }
    
    //查询一条分仓保管账数据
    this.findByIdFcbgzData = function(id) {
    	var d = $q.defer();
        $http({
            method : 'GET', 
            url : APP_CONFIG.agileUrl + '/agile/fcbgzController/findByIdFcbgzData',
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
    }
    
    this.queryRkZsList = function(pageNum, pageSize, orgId, houseId, wareId) {
        var d = $q.defer();
        $http({
            method : 'GET', 
            url : APP_CONFIG.agileUrl + '/agile/fcbgzController/queryRkZsList',
            params : {
                pageNum : pageNum,
                pageSize : pageSize,
                orgId : orgId,
                houseId : houseId,
                warehouseId : wareId
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

    //查询检验信息
    this.queryCrkJyxx = function(id) {
    	var d = $q.defer();
        $http({
            method : 'GET', 
            url : APP_CONFIG.agileUrl + '/agile/fcbgzController/queryCrkJyxx',
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
    }
});